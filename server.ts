// Configuration and imports
import express from "express";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dg7ev1g1k",
  api_key: process.env.CLOUDINARY_API_KEY || "433133643856725",
  api_secret: process.env.CLOUDINARY_API_SECRET || "LoO41zdv-tKAtNQKixRpqYoVMGY",
};

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.log("[Setup] Using fallback Cloudinary Cloud Name");
}
if (!process.env.CLOUDINARY_API_KEY) {
  console.log("[Setup] Using fallback Cloudinary API Key");
}

cloudinary.config(cloudinaryConfig);

// Configure Google Sheets
const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const googleKey = process.env.GOOGLE_PRIVATE_KEY;

if (!googleEmail || !googleKey) {
  console.log("[Setup] Google credentials missing - Sheets integration will likely fail");
}

const auth = new google.auth.JWT({
  email: googleEmail,
  key: googleKey?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const app = express();
const PORT = 3000;

// Request logging for debugging
app.use((req, res, next) => {
  if (req.url.startsWith("/api/")) {
    console.log(`[Server] ${req.method} ${req.url}`);
  }
  next();
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure Multer with Cloudinary Storage for streaming directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: express.Request, file: Express.Multer.File) => {
    let resourceType: "image" | "video" | "raw" | "auto" = "auto";
    if (file.mimetype.includes("audio")) resourceType = "video";
    if (file.mimetype.includes("pdf")) resourceType = "raw";
    
    return {
      folder: `titliii/${file.fieldname === "file" ? "instant" : file.fieldname}`,
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9]/g, "_")}`,
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Helper for buffer uploads (like summaries)
async function uploadBufferToCloudinary(fileBuffer: Buffer, folder: string, resourceType: "image" | "video" | "raw" | "auto" = "auto") {
  return new Promise<string | null>((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `titliii/${folder}`,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary buffer upload error:", error);
          resolve(null);
        } else {
          resolve(result?.secure_url || null);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
}

// API Routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.post("/api/upload", (req, res, next) => {
  console.log("POST /api/upload request received");
  next();
}, upload.single("file"), async (req, res) => {
  try {
    // With multer-storage-cloudinary, req.file.path is the Cloudinary URL
    const file = req.file as any;
    if (!file) {
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    console.log(`File uploaded to Cloudinary: ${file.path}`);
    res.json({ status: "success", url: file.path });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

app.post("/api/submit", (req, res, next) => {
  console.log("POST /api/submit request received");
  next();
}, upload.any(), async (req: express.Request, res: express.Response) => {
  try {
    const fields = req.body;
    const files = req.files as any[]; // multer-storage-cloudinary files
    
    console.log(`Form submission received from: ${fields.userEmail || "anonymous"}`);
    
    const cloudinaryUrls: Record<string, string> = {};
    
    // Cloudinary URLs are already in the file objects
    if (files && files.length > 0) {
      console.log(`Processing ${files.length} uploaded files...`);
      for (const file of files) {
        cloudinaryUrls[file.fieldname] = file.path;
        console.log(`Linked ${file.fieldname}: ${file.path}`);
      }
    }

    // Combined data
    const config = JSON.parse(fields.configData || "{}");
    const userEmail = (fields.userEmail || "").toLowerCase();
    const autoFilledPdfUrl = fields.autoFilledPdfUrl;

    if (autoFilledPdfUrl) {
      cloudinaryUrls["paymentPdf"] = autoFilledPdfUrl;
    }

    // Map Cloudinary URLs back to config if needed (e.g. for songs)
    const songFiles = Object.keys(cloudinaryUrls).filter(k => k.startsWith("songFile_"));
    if (songFiles.length > 0 && config.playlist && config.playlist.songs) {
      songFiles.forEach(key => {
        const index = parseInt(key.split("_")[1]);
        if (config.playlist.songs[index]) {
          config.playlist.songs[index].url = cloudinaryUrls[key];
        }
      });
    }

    // Format data for Google Sheets
    const timestamp = new Date().toISOString();
    
    // Helper to get matching Cloudinary links
    const getLinks = (prefix: string) => Object.keys(cloudinaryUrls)
      .filter(k => k.startsWith(prefix))
      .map(k => cloudinaryUrls[k])
      .join("\n");

    // Generate readable summary text
    let summaryText = `TITLIII FORM SUBMISSION SUMMARY\n`;
    summaryText += `==================================\n\n`;
    summaryText += `SUBMISSION DATE: ${timestamp}\n`;
    summaryText += `SUBMITTED BY: ${userEmail}\n`;
    summaryText += `==================================\n\n`;

    summaryText += `1. REQUIRED INFORMATION\n`;
    summaryText += `-----------------------\n`;
    summaryText += `User Email: ${userEmail}\n`;
    summaryText += `Payment Receipt: ${cloudinaryUrls.paymentPdf || "No receipt uploaded"}\n\n`;

    summaryText += `2. BACKGROUND MUSIC\n`;
    summaryText += `-------------------\n`;
    summaryText += `Music URL: ${cloudinaryUrls.backgroundMusicFile || config.backgroundMusic?.url || "N/A"}\n\n`;

    summaryText += `3. INTRO STAGE\n`;
    summaryText += `--------------\n`;
    summaryText += `Title: ${config.intro?.title || "N/A"}\n`;
    summaryText += `Intro Images:\n`;
    config.intro?.images?.forEach((img: string, idx: number) => {
      const uploaded = cloudinaryUrls[`introFile_${idx}`];
      summaryText += `  Image ${idx + 1}: ${uploaded || img}\n`;
    });
    summaryText += `\n`;

    summaryText += `4. JOURNEY TIMELINE\n`;
    summaryText += `----------------\n`;
    summaryText += `Title: ${config.crushHistory?.title || "N/A"}\n`;
    config.crushHistory?.timeline?.forEach((t: any, idx: number) => {
      const uploaded = cloudinaryUrls[`timelineFile_${idx}`];
      summaryText += `  ● ${t.year}: ${t.label}\n    Text: ${t.text}\n    Image: ${uploaded || t.img}\n`;
    });
    summaryText += `\n`;

    summaryText += `5. WHY YOU ARE SPECIAL\n`;
    summaryText += `--------------------\n`;
    summaryText += `Title: ${config.whyILikeHer?.title || "N/A"}\n`;
    config.whyILikeHer?.reasons?.forEach((r: any, idx: number) => {
      const uploaded = cloudinaryUrls[`specialFile_${idx}`];
      summaryText += `  ● Reason: ${r.text}\n    Image: ${uploaded || r.img}\n`;
    });
    summaryText += `\n`;

    summaryText += `6. BIRTHDAY QUIZ\n`;
    summaryText += `---------------\n`;
    summaryText += `Quest Label: ${config.mcqGame?.questLabel || "N/A"}\n`;
    config.mcqGame?.questions?.forEach((q: any, idx: number) => {
      summaryText += `  Q${idx + 1}: ${q.q}\n    Options: ${q.opts?.join(" | ")}\n    Correct: ${q.opts?.[q.correct]}\n`;
    });
    summaryText += `\n`;

    summaryText += `7. DO YOU LOVE ME?\n`;
    summaryText += `-----------------\n`;
    summaryText += `Title: ${config.doYouLoveMe?.title || "N/A"}\n`;
    summaryText += `Hint: ${config.doYouLoveMe?.hintText || "N/A"}\n`;
    summaryText += `Question Image: ${cloudinaryUrls.loveQuestionFile || config.doYouLoveMe?.questionImg || "N/A"}\n`;
    summaryText += `Success Image: ${cloudinaryUrls.loveSuccessFile || config.doYouLoveMe?.successImg || "N/A"}\n\n`;

    summaryText += `8. HEART GAME\n`;
    summaryText += `-------------\n`;
    summaryText += `Title: ${config.heartGame?.title || "N/A"}\n`;
    summaryText += `Subtext: ${config.heartGame?.subText || "N/A"}\n`;
    summaryText += `Target Score: ${config.heartGame?.targetScore || "N/A"}\n`;
    summaryText += `Falling Hearts Image: ${cloudinaryUrls.heartFallingFile || config.heartGame?.fallingHeartsImg || "N/A"}\n`;
    summaryText += `Success Image: ${cloudinaryUrls.heartSuccessFile || config.heartGame?.successImg || "N/A"}\n\n`;

    summaryText += `9. MAKE A BOUQUET\n`;
    summaryText += `----------------\n`;
    summaryText += `Title: ${config.bouquet?.title || "N/A"}\n`;
    summaryText += `SubText: ${config.bouquet?.subText || "N/A"}\n`;
    summaryText += `Final Message: ${config.bouquet?.finalMessage || "N/A"}\n`;
    summaryText += `Flowers:\n`;
    config.bouquet?.flowers?.forEach((f: any) => {
      summaryText += `  - ${f.emoji} ${f.name}\n`;
    });
    summaryText += `\n`;

    summaryText += `10. STRAWBERRY CAKE\n`;
    summaryText += `------------------\n`;
    summaryText += `Title: ${config.cake?.title || "N/A"}\n`;
    summaryText += `Cake Image: ${cloudinaryUrls.cakeFile || config.cake?.cakeImg || "N/A"}\n`;
    summaryText += `Birthday Message: ${config.cake?.birthdayMessage || "N/A"}\n\n`;

    summaryText += `11. GIFTS FOR YOU (REVEAL)\n`;
    summaryText += `-------------------------\n`;
    summaryText += `Title: ${config.reveal?.title || "N/A"}\n`;
    config.reveal?.items?.forEach((item: any, idx: number) => {
      const uploaded = cloudinaryUrls[`revealFile_${idx}`];
      summaryText += `  - ${item.text} (${item.pose})\n    Image: ${uploaded || item.img}\n`;
    });
    summaryText += `\n`;

    summaryText += `12. UNITE LOVE (HEART UNION)\n`;
    summaryText += `--------------------------\n`;
    summaryText += `Title: ${config.heartUnion?.titleUnmerged || "N/A"}\n`;
    summaryText += `Partner 1: ${config.heartUnion?.khushterLabel || "N/A"}\n`;
    summaryText += `Partner 2: ${config.heartUnion?.mahiLabel || "N/A"}\n`;
    summaryText += `Center Name: ${config.heartUnion?.centerName || "N/A"}\n\n`;

    summaryText += `13. HOLY REQUEST\n`;
    summaryText += `----------------\n`;
    summaryText += `Label: ${config.holyRequest?.label || "N/A"}\n`;
    summaryText += `Title: ${config.holyRequest?.title || "N/A"}\n`;
    summaryText += `Request Image: ${cloudinaryUrls.holyRequestFile || config.holyRequest?.requestImg || "N/A"}\n\n`;

    summaryText += `14. PERSONAL LETTER\n`;
    summaryText += `------------------\n`;
    summaryText += `Recipient: ${config.letter?.recipient || "N/A"}\n`;
    summaryText += `Letter Paragraphs:\n${config.letter?.paragraphs?.join("\n") || "N/A"}\n`;
    summaryText += `Letter Image: ${cloudinaryUrls.letterFile || config.letter?.letterImg || "N/A"}\n\n`;

    summaryText += `15. SPECIAL WISHES\n`;
    summaryText += `------------------\n`;
    summaryText += `Title: ${config.specialWishes?.title || "N/A"}\n`;
    config.specialWishes?.wishes?.forEach((w: any, idx: number) => {
      const uploaded = cloudinaryUrls[`wishFile_${idx}`];
      summaryText += `  ● ${w.title}: ${w.description}\n    Image: ${uploaded || w.img}\n`;
    });
    summaryText += `\n`;

    summaryText += `16. ROMANTIC PLAYLIST\n`;
    summaryText += `--------------------\n`;
    summaryText += `Playlist Name: ${config.playlist?.name || "N/A"}\n`;
    summaryText += `Playlist Description: ${config.playlist?.description || "N/A"}\n`;
    summaryText += `Cover Image: ${cloudinaryUrls.playlistCoverFile || config.playlist?.coverImage || "N/A"}\n`;
    summaryText += `Quote: ${config.playlist?.quoteLine1} ${config.playlist?.quoteLine2}\n`;
    summaryText += `Songs:\n`;
    config.playlist?.songs?.forEach((s: any, idx: number) => {
      const uploaded = cloudinaryUrls[`songFile_${idx}`];
      summaryText += `  - ${s.title} (${s.artist}) [${s.label}]\n    URL: ${uploaded || s.url}\n`;
    });
    summaryText += `\n`;

    summaryText += `17. FINAL WISH\n`;
    summaryText += `--------------\n`;
    summaryText += `Title: ${config.finalWish?.title1} ${config.finalWish?.title2}\n`;
    summaryText += `Main Message: ${config.finalWish?.mainMessage || "N/A"}\n`;
    summaryText += `Vows:\n${config.finalWish?.vows?.join("\n") || "N/A"}\n`;
    summaryText += `From ${config.finalWish?.name1} to ${config.finalWish?.name2}\n\n`;

    summaryText += `==================================\n`;
    summaryText += `STORE: ARHAMBUILDS.IN\n`;
    summaryText += `==================================\n`;
    summaryText += `END OF SUBMISSION\n`;
    summaryText += `==================================\n`;

    // Save summary to buffer and upload
    const summaryBuffer = Buffer.from(summaryText);
    const summaryUrl = await uploadBufferToCloudinary(summaryBuffer, "summaries", "raw");

    const row = [
      timestamp, // A
      userEmail, // B
      // Intro (C)
      `Title: ${config.intro?.title || "N/A"}\nNames: ${config.intro?.names?.join(", ") || "N/A"}\nImages:\n${getLinks("introFile_")}`,
      // Timeline (D)
      `${config.crushHistory?.timeline?.map((t: any) => `● ${t.year}: ${t.label} - ${t.text}`).join("\n") || "N/A"}\nImages:\n${getLinks("timelineFile_")}`,
      // Special Memories (E)
      `Why I Like Her: ${config.whyILikeHer?.title || "N/A"}\nReasons: ${config.whyILikeHer?.reasons?.map((r: any) => r.text).join(", ") || "N/A"}\nImages:\n${getLinks("specialFile_")}`,
      // MCQ Game (F)
      config.mcqGame?.questions?.map((q: any) => `Q: ${q.q}\nAns: ${q.opts[q.correct]}`).join("\n\n") || "N/A",
      // Heart Game (G)
      `Title: ${config.heartGame?.title || "N/A"}\nSubtext: ${config.heartGame?.subText || "N/A"}\nImages:\n${getLinks("heartGameFile_")}`,
      // Love Question (H)
      `Title: ${config.doYouLoveMe?.title || "N/A"}\nHint: ${config.doYouLoveMe?.hintText || "N/A"}\nImages:\n${getLinks("loveFile_")}`,
      // Reveal (I)
      `${config.reveal?.items?.map((r: any) => `● ${r.title || r.text}: ${r.content || r.pose}`).join("\n") || "N/A"}\nImages:\n${getLinks("revealFile_")}`,
      // Special Wishes (J)
      `${config.specialWishes?.wishes?.map((w: any) => `● ${w.title}: ${w.description}`).join("\n") || "N/A"}\nImages:\n${getLinks("specialWishesFile_")}`,
      // Letter (K)
      `Recipient: ${config.letter?.recipient || "N/A"}\nBody: ${config.letter?.paragraphs?.join("\n") || "N/A"}\nImage: ${cloudinaryUrls.letterFile || "None"}`,
      // Playlist (L)
      `Songs: ${config.playlist?.songs?.map((s: any) => s.title).join(", ") || "N/A"}\nAudio & Music:\n${getLinks("songFile_")}\nCover: ${cloudinaryUrls.playlistCover || "None"}\nBackground Music: ${cloudinaryUrls.backgroundMusicFile || "None"}`,
      // Cake & Holy (M)
      `Cake Image: ${cloudinaryUrls.cakeFile || "None"}\nHoly Request Image: ${cloudinaryUrls.holyRequestFile || "None"}`,
      // Payment (N)
      cloudinaryUrls.paymentPdf || "No receipt",
      // Full Config (O)
      JSON.stringify(config),
      // Summary TXT URL (P)
      summaryUrl || "Upload failed"
    ];

    // Method 1: Google Sheets API
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Leads!A:P",
          valueInputOption: "RAW",
          requestBody: {
            values: [row],
          },
        });
        console.log("Data appended to Google Sheet via API.");
      } catch (sheetError) {
        console.error("Google Sheets API error:", sheetError);
      }
    } 
    
    // Method 2: Fallback to GAS (if provided)
    if (process.env.VITE_GAS_URL) {
      try {
        const payload = {
          userEmail,
          configData: JSON.stringify(config),
          cloudinaryLinks: cloudinaryUrls,
          pdfUrl: cloudinaryUrls.paymentPdf,
          summaryUrl: summaryUrl
        };

        await fetch(process.env.VITE_GAS_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        });
        console.log("Data sent to Google Apps Script.");
      } catch (gasError) {
        console.error("GAS error:", gasError);
      }
    }

    res.json({ 
      status: "success", 
      message: "Form submitted successfully",
      links: cloudinaryUrls 
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

// Global Error Handler to ensure all errors return JSON, not HTML
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Express Error Handler:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  startServer();
}

export default app;
export { app };
