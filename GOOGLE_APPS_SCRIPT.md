# Arham Builds - Google Integration Guide

Follow these steps to connect your form to Google Sheets using the Cloudinary-powered backend.

## Step 1: Create a Google Sheet
1. Create a new Google Sheet named **Titliii leads**.
2. Create a tab named **Leads**.
3. In the **first row (A1 to P1)**, type these exact headers:
   - `Timestamp`
   - `Email`
   - `Intro Stage`
   - `Life Timeline`
   - `Special Memories`
   - `Birthday Quiz`
   - `Heart Game`
   - `Love Message`
   - `Reveal Stage`
   - `Special Wishes`
   - `Personal Letter`
   - `Playlist & Music`
   - `Visual Assets`
   - `Payment Receipt`
   - `Full Config JSON`
   - `Summary TXT URL`

## Step 2: Create the Google Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code and paste the following script:

```javascript
/* 
  Titliii by Arham - Cloudinary + Sheets Integration
  Handles structured data from the Titliii platform.
*/

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Leads") || ss.getSheets()[0];
    
    const config = JSON.parse(data.configData || "{}");
    const cloudinaryLinks = data.cloudinaryLinks || {};
    
    // Helper to get matching Cloudinary links
    const getLinks = (prefix) => Object.keys(cloudinaryLinks)
      .filter(k => k.startsWith(prefix))
      .map(k => cloudinaryLinks[k])
      .join("\n");

    const row = [
      new Date(), // A: Timestamp
      data.userEmail, // B: Email
      
      // C: Intro Stage
      `Title: ${config.intro?.title || "N/A"}\nNames: ${config.intro?.names?.join(", ") || "N/A"}\nImages:\n${getLinks("introFile_")}`,
      
      // D: Timeline
      `${config.crushHistory?.timeline?.map(t => `● ${t.year || t.date}: ${t.label || t.title} - ${t.text || t.desc}`).join("\n") || "N/A"}\nImages:\n${getLinks("timelineFile_")}`,
      
      // E: Special Memories
      `Why I Like Her: ${config.whyILikeHer?.title || "N/A"}\nReasons: ${config.whyILikeHer?.reasons?.map(r => r.text).join(", ") || "N/A"}\nImages:\n${getLinks("specialFile_")}`,
      
      // F: Birthday Quiz
      config.mcqGame?.questions?.map(q => `Q: ${q.q}\nAns: ${q.opts[q.correct]}`).join("\n\n") || "N/A",
      
      // G: Heart Game
      `Title: ${config.heartGame?.title || "N/A"}\nSubtext: ${config.heartGame?.subText || "N/A"}\nImages:\n${getLinks("heartGameFile_")}`,
      
      // H: Love Message
      `Title: ${config.doYouLoveMe?.title || "N/A"}\nHint: ${config.doYouLoveMe?.hintText || "N/A"}\nImages:\n${getLinks("loveFile_")}`,
      
      // I: Reveal Stage
      `${config.reveal?.items?.map(r => `● ${r.title || r.text}: ${r.content || r.pose}`).join("\n") || "N/A"}\nImages:\n${getLinks("revealFile_")}`,
      
      // J: Special Wishes
      `${config.specialWishes?.wishes?.map(w => `● ${w.title}: ${w.description}`).join("\n") || "N/A"}\nImages:\n${getLinks("specialWishesFile_")}`,
      
      // K: Personal Letter
      `Recipient: ${config.letter?.recipient || "N/A"}\nBody: ${config.letter?.paragraphs?.join("\n") || "N/A"}\nImage: ${cloudinaryLinks.letterFile || "None"}`,
      
      // L: Playlist & Music
      `Songs: ${config.playlist?.songs?.map(s => s.title).join(", ") || "N/A"}\nAudio & Music:\n${getLinks("songFile_")}\nCover: ${cloudinaryLinks.playlistCover || "None"}\nBackground Music: ${cloudinaryLinks.backgroundMusicFile || "None"}`,
      
      // M: Visual Assets
      `Cake Image: ${cloudinaryLinks.cakeFile || "None"}\nHoly Request Image: ${cloudinaryLinks.holyRequestFile || "None"}`,
      
      // N: Payment Receipt
      data.pdfUrl || "No receipt",
      
      // O: Full Config JSON
      data.configData,

      // P: Summary TXT URL
      data.summaryUrl || "Not generated"
    ];

    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data recorded" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Select type: **Web app**.
3. Description: `Titliii Cloudinary Backend`.
4. Execute as: **Me** (your email).
5. Who has access: **Anyone**.
6. Click **Deploy**.
7. **Copy the Web App URL**.

## Step 4: Configure the App
1. Open the project settings in AI Studio.
2. In the **Environment Variables** section, set `VITE_GAS_URL` to your copied URL.
3. The server will automatically use this URL to forward data after Cloudinary uploads are complete.

---

### Security Note
The direct Google Sheets API integration is also supported if you provide `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` in your environment. If both are provided, the system will attempt to use the API directly first, and fallback to the App Script URL.

