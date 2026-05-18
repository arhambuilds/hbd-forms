/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tutorial from "./pages/Tutorial";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import { 
  Sparkles, 
  ImageIcon, 
  Send, 
  Check, 
  Eye,
  Link2,
  Mail,
  RefreshCw,
  Layout,
  MessageSquare,
  Flower2,
  Heart,
  Cake,
  Gift,
  Plus,
  Trash2,
  HelpCircle,
  Upload,
  FileText,
  ChevronDown,
  ChevronUp,
  User,
  Music,
  ArrowRight
} from "lucide-react";
import { cn } from "./lib/utils";
import imageCompression from 'browser-image-compression';

// Types
interface PageData {
  config: {
    musicUrl: string;
    footerText: string;
    playlist: {
      name: string;
      description: string;
      coverImage: string;
      backgroundImage: string;
      quoteLine1: string;
      quoteLine2: string;
      finalVowButton: string;
      songs: { 
        title: string; 
        artist: string; 
        label: string; 
        url: string; 
        cover: string; 
      }[];
    };
    intro: {
      title: string;
      buttonText: string;
      tapToOpen: string;
      images: string[];
    };
    madeSomething: {
      label: string;
      title: string;
      buttonText: string;
    };
    crushHistory: {
      title: string;
      timeline: { year: string; label: string; text: string; img: string }[];
      footerMain: string;
      footerYear: string;
      footerSub: string;
      buttonText: string;
    };
    letter: {
      unfoldHint: string;
      memoirLabel: string;
      fromHeartLabel: string;
      title: string;
      recipient: string;
      paragraphs: string[];
      signatureLabel: string;
      signatureName: string;
      buttonText: string;
      letterImg: string;
    };
    specialWishes: {
      title: string;
      wishes: { title: string; description: string; sticker: string; img: string }[];
      buttonText: string;
    };
    whyILikeHer: {
      title: string;
      reasons: { text: string; img: string }[];
      buttonText: string;
    };
    mcqGame: {
      questLabel: string;
      ofLabel: string;
      questions: { q: string; opts: string[]; correct: number }[];
    };
    doYouLoveMe: {
      title: string;
      yesButton: string;
      noButton: string;
      hintText: string;
      footerLabel: string;
      questionImg: string;
      successImg: string;
    };
    heartGame: {
      title: string;
      subText: string;
      targetScore: number;
      progressLabel: string;
      successTitle: string;
      successSub: string;
      wonHeartText: string;
      playButtonText: string;
      fallingHeartsImg: string;
      successImg: string;
    };
    bouquet: {
      title: string;
      subText: string;
      buttonText: string;
      successMessage: string;
      finalMessage: string;
      sendWithLoveLabel: string;
      pickLabel: string;
      flowersLabel: string;
      flowers: { emoji: string; name: string }[];
    };
    reveal: {
      title: string;
      tapMeHint: string;
      items: { text: string; pose: string; img: string }[];
    };
    heartUnion: {
      titleMerged1: string;
      titleMerged2: string;
      titleUnmerged: string;
      tapInstruction: string;
      khushterLabel: string;
      mahiLabel: string;
      centerName: string;
      successTitle: string;
      successSub: string;
      beginningLabel: string;
      bondingLabel: string;
    };
    cake: {
      title: string;
      successTitle: string;
      instruction: string;
      lightInstruction: string;
      blowInstruction: string;
      cutInstruction: string;
      buttonText: string;
      blowButtonLabel: string;
      lightButtonLabel: string;
      candlesLabel: string;
      birthdayMessage: string;
      finalWishMessage: string;
      cakeImg: string;
    };
    holyRequest: {
      label: string;
      title: string;
      buttonText: string;
      requestImg: string;
    };
    finalWish: {
      tapToOpen: string;
      closeLabel: string;
      foreverLabel: string;
      label: string;
      title1: string;
      title2: string;
      mainMessage: string;
      vows: string[];
      signedByLabel: string;
      name1: string;
      name2: string;
      restartText: string;
    };
    backgroundMusic: {
      url: string;
    };
  }
}

const DEFAULT_DATA: PageData = {
  config: {
    musicUrl: "/audios/bg.mp3",
    footerText: "arhambuilds.io 💗",
    playlist: {
      name: "Just Aaham",
      description: "CURATED WITH LOVE BY AMTITUDE",
      coverImage: "/images/cover.jpeg",
      backgroundImage: "/images/cover.jpeg",
      quoteLine1: "Every song reminds me of you,",
      quoteLine2: "and everything I can't say, these songs say for me.",
      finalVowButton: "THE FINAL VOW",
      songs: [
        {
          title: "Pal Pal",
          artist: "Talwinder, ABS",
          label: "Amtitude's Choice",
          url: "/audios/PalPal.mp3",
          cover: "/images/cover.jpeg"
        },
        {
          title: "Ishqa Ve",
          artist: "Zeeshan Ali",
          label: "Melody Mix",
          url: "/audios/IshqaVe.mp3",
          cover: "/images/cover.jpeg"
        },
        {
        title: "Jeene Laga Hoon",
        artist: "Atif Aslam",
        label: "Soulful",
        url: "/audios/JeeneLagaHoon.mp3",
        cover: "/images/cover.jpeg"
        },
        {
        title: "Kaun Tujhe",
        artist: "Palak Muchhal",
        label: "Sufi Vibes",
        url: "/audios/KaunTujhe.mp3",
        cover: "/images/cover.jpeg"
        }
      ]
    },
    intro: {
      title: "Happy Birthday Sahiba!<br/>You mean the world to me!",
      buttonText: "FOR THE BIRTHDAY GIRL",
      tapToOpen: "TAP TO OPEN",
      images: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    madeSomething: {
      label: "SURPRISE UNLOCKED",
      title: "I made a special journey… <br/> just for your day 🤍",
      buttonText: "CELEBRATE WITH ME"
    },
    crushHistory: {
      title: "Our's Amazing Journey",
      timeline: [
        { year: "2023", label: "THE DISCOVERY", text: "Meeting the soul who brings so much light.", img: "https://images.unsplash.com/photo-1516589174184-c685266e4871?q=80&w=1000" },
        { year: "2024", label: "THE MEMORIES", text: "A year full of laughter and shared dreams.", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000" },
        { year: "2025", label: "THE BOND", text: "Watching you grow into the incredible person you are.", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000" },
        { year: "2026", label: "HAPPY BIRTHDAY", text: "Celebrating another beautiful year of YOU.", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000" }
      ],
      footerMain: "EST. 2023 •",
      footerYear: "FOREVER BEYOND",
      footerSub: "You are the light of my life",
      buttonText: "See what's next"
    },
    letter: {
      unfoldHint: "UNFOLD MY HEART",
      memoirLabel: "BIRTHDAY MEMOIR",
      fromHeartLabel: "SENT FROM AMTITUDE'S HEART",
      title: "A Birthday Letter",
      recipient: "Dear Sahiba!",
      paragraphs: [
        "Happy Birthday meri pyaari Sahiba. I just want you to know that you are really special to me. Loving you has been something quiet, honest, and real, and I will always carry that feeling with respect. From Amtitude, someone who has always cared for you in his own simple way.",
        "I know your heart belongs to someone else, and I truly respect that. This is our last school year, and I understand that life with take us in different directions. Still, I’m thankful for the memories, the moments, and the presence you had in my life. Loving you was never about being together, it was about wishing you happiness.",
        "As you move ahead, I wish that all your dreams come true. May you become the neurologist you’ve always wanted to be, and may life give you everything you deserve. I hope you find love, peace, and a future that makes you smile. Once Again, Happiest Birthday, Meri pyaari Sahiba!"
      ],
      signatureLabel: "Forever Yours,",
      signatureName: "Amtitude!",
      buttonText: "I LOVE YOU, ARHAM!",
      letterImg: "https://images.unsplash.com/photo-1512418490979-92798ccc13b0?q=80&w=1000"
    },
    specialWishes: {
      title: "My Special Wishes!",
      wishes: [
        { 
          title: "ENDLESS HAPPINESS", 
          description: "May your heart always be as light as a feather and your smile never fade.",
          sticker: "EXCITED",
          img: "https://images.unsplash.com/photo-1516589174184-c685266e4871?q=80&w=1000"
        },
        { 
          title: "PURE MAGIC", 
          description: "May every moment of your new year be filled with wonder and beautiful surprises.",
          sticker: "HEARTS",
          img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000"
        },
        { 
          title: "DEEPEST PEACE", 
          description: "May you always find comfort in the quiet and strength in your soul.",
          sticker: "PRAY",
          img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000"
        },
        { 
          title: "FOREVER TOGETHER", 
          description: "My wish is to be by your side for every birthday yet to come.",
          sticker: "HOLD_HEART",
          img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000"
        }
      ],
      buttonText: "SEAL MY WISHES"
    },
    whyILikeHer: {
      title: "Why You Are So Special",
      reasons: [
        { text: "Your angelic soul", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000" },
        { text: "Your radiant laugh", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000" },
        { text: "Your warm heart", img: "https://images.unsplash.com/photo-1516589174184-c685266e4871?q=80&w=1000" },
        { text: "Your pure energy", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000" },
        { text: "Your kindness", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000" },
        { text: "Just being Sahiba!", img: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1000" }
      ],
      buttonText: "ALWAYS SPECIAL..."
    },
    mcqGame: {
      questLabel: "QUEST",
      ofLabel: "OF",
      questions: [
        { 
          q: "Who is the Birthday Queen?", 
          opts: ["Someone", "Everyone", "Sahiba", "No one"], 
          correct: 2 
        },
        { 
          q: "What does Sahiba! deserve?", 
          opts: ["Gifts", "All the happiness", "Cakes", "Everything"], 
          correct: 1 
        },
        { 
          q: "What do I want for you today?", 
          opts: ["Smile", "Joy", "Peace", "All of above"], 
          correct: 3 
        }
      ]
    },
    doYouLoveMe: {
      title: "Do you love me!?",
      yesButton: "YES",
      noButton: "Nahi bataungi, Pakka!?",
      hintText: "Click YES for a surprise",
      footerLabel: "ROYAL CHOICE",
      questionImg: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000",
      successImg: "https://images.unsplash.com/photo-1516589174184-c685266e4871?q=80&w=1000"
    },
    heartGame: {
      title: "Collect Birthday Hearts",
      subText: "for my birthday girl 🎀",
      targetScore: 7,
      progressLabel: "Progress",
      successTitle: "Amazing!",
      successSub: "You've won my heart!",
      wonHeartText: "You've won my heart!",
      playButtonText: "Catch My Hearts",
      fallingHeartsImg: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000",
      successImg: "https://images.unsplash.com/photo-1516589174184-c685266e4871?q=80&w=1000"
    },
    bouquet: {
      title: "Flowers for you",
      subText: "picked with love for the best girl 💐",
      buttonText: "SEND WITH LOVE",
      successMessage: "I love Sahiba!",
      finalMessage: "Every petal I picked carries a whisper of my heart. You make my life bloom in ways I never thought possible. Forever yours, Sahiba!",
      sendWithLoveLabel: "SEND WITH LOVE",
      pickLabel: "PICK",
      flowersLabel: "FLOWERS",
      flowers: [
        { emoji: 'rose', name: 'ROSE' },
        { emoji: 'tulip', name: 'TULIP' },
        { emoji: 'cherry', name: 'CHERRY' },
        { emoji: 'sun', name: 'SUN' },
        { emoji: 'hibiscus', name: 'HIBISCUS' },
        { emoji: 'daisy', name: 'DAISY' }
      ]
    },
    reveal: {
      title: "For you, With Love",
      tapMeHint: "TAP ME",
      items: [
        { text: "DIAMOND RING", pose: "GIFT1", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000" },
        { text: "CHOCOLATES", pose: "GIFT2", img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000" },
        { text: "NECKLACE", pose: "GIFT3", img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000" },
        { text: "EARRINGS", pose: "GIFT4", img: "https://images.unsplash.com/photo-1535633302703-942041a48f6b?q=80&w=1000" },
        { text: "A WATCH", pose: "GIFT5", img: "https://images.unsplash.com/photo-1524805444758-08dd0b33d7b6?q=80&w=1000" },
        { text: "YOUR AMTITUDE", pose: "GIFT6", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000" }
      ]
    },
    heartUnion: {
      titleMerged1: "Virat",
      titleMerged2: "Anushka",
      titleUnmerged: "Unite Our Hearts Forever",
      tapInstruction: "Two Hearts, One Soul",
      khushterLabel: "Aaham!",
      mahiLabel: "Sahiba!",
      centerName: "#Virushka",
      successTitle: "Birthday Soulmates",
      successSub: "ANOTHER YEAR TOGETHER",
      beginningLabel: "OUR BEAUTIFUL BEGINNING",
      bondingLabel: "BONDING"
    },
    cake: {
      title: "Make a Wish, Sahiba!",
      successTitle: "Happy Birthday, Sahiba!",
      instruction: "TAP THE CANDLES TO LIGHT THEM, THEN\nTAP THE CAKE TO BLOW THEM OUT!",
      lightInstruction: "TAP THE CANDLES TO LIGHT THEM",
      blowInstruction: "TAP THE CAKE TO BLOW THEM OUT!",
      cutInstruction: "TAP THE CAKE TO CUT IT ❤️",
      buttonText: "CUT THE CAKE",
      blowButtonLabel: "BLOW THE CANDLES",
      lightButtonLabel: "LIGHT",
      candlesLabel: "CANDLES",
      birthdayMessage: "Once Again! Happiest<br/>Birthday Sahiba!",
      finalWishMessage: "My heart is yours today and always, Sahiba !...",
      cakeImg: "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=1000"
    },
    holyRequest: {
      label: "A HOLY REQUEST",
      title: "Sahiba!, will you let me celebrate every birthday with you!?",
      buttonText: "YES, FOREVER",
      requestImg: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000"
    },
    finalWish: {
      tapToOpen: "Tap to open",
      closeLabel: "Close",
      foreverLabel: "Always & Forever",
      label: "A SPECIAL BIRTHDAY WISH",
      title1: "Happy Birthday",
      title2: "Meri Sahiba!",
      mainMessage: "May every wish you make today come true. You deserve the world, and I'll always be here to remind you of that.",
      vows: [
        "Just wanted to remind you—you're my favorite person. My days are better, smiles are wider, and life is sweeter because of you.",
        "I hope your birthday is full of love, magic, and everything that makes you smile"
      ],
      signedByLabel: "With lots of love,",
      name1: "Amtitude!",
      name2: "Sahiba!",
      restartText: "READ AGAIN"
    },
    backgroundMusic: {
      url: "/audios/bg.mp3"
    }
  }
};

const STEPS = [
  { id: 'required', label: 'Required Info' },
  { id: 'backgroundMusic', label: 'Background Music' },
  { id: 'intro', label: 'Intro Stage' },
  { id: 'journey', label: 'Journey Timeline' },
  { id: 'special', label: 'Why You Are Special' },
  { id: 'quiz', label: 'Birthday Quiz' },
  { id: 'love', label: 'Do You Love Me?' },
  { id: 'heart', label: 'Heart Game' },
  { id: 'bouquet', label: 'Make a Bouquet' },
  { id: 'cake', label: 'Strawberry Cake' },
  { id: 'reveal', label: 'Gifts For You' },
  { id: 'heartUnion', label: 'Unite Love' },
  { id: 'holyRequest', label: 'Holy Request' },
  { id: 'letter', label: 'Personal Letter' },
  { id: 'specialWishes', label: 'Special Wishes' },
  { id: 'playlist', label: 'Romantic Playlist' },
  { id: 'finalWish', label: 'Final Wish' },
];

export default function App() {
  const [data, setData] = useState<PageData>(DEFAULT_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingStates, setUploadingStates] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [paymentPdfFile, setPaymentPdfFile] = useState<File | null>(null);
  const [autoFilledPdfUrl, setAutoFilledPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const pdfParam = params.get('pdfUrl');
    const sourceParam = params.get('ref');

    if (emailParam) setUserEmail(emailParam);
    if (pdfParam) setAutoFilledPdfUrl(decodeURIComponent(pdfParam));
    
    // Auto-expand required section if redirected
    if (sourceParam === 'arhambuilds' || emailParam || pdfParam) {
      setExpandedSections(prev => ({ ...prev, required: true }));
    }
  }, []);
  const [introImageFiles, setIntroImageFiles] = useState<{ [key: number]: File }>({});
  const [timelineImageFiles, setTimelineImageFiles] = useState<{ [key: number]: File }>({});
  const [specialImageFiles, setSpecialImageFiles] = useState<{ [key: number]: File }>({});
  const [specialWishesImageFiles, setSpecialWishesImageFiles] = useState<{ [key: number]: File }>({});
  const [songFiles, setSongFiles] = useState<{ [key: number]: File }>({});
  const [heartGameImageFiles, setHeartGameImageFiles] = useState<{ [key: string]: File }>({});
  const [loveImageFiles, setLoveImageFiles] = useState<{ [key: string]: File }>({});
  const [revealImageFiles, setRevealImageFiles] = useState<{ [key: number]: File }>({});
  const [playlistCoverFile, setPlaylistCoverFile] = useState<File | null>(null);
  const [holyRequestImageFile, setHolyRequestImageFile] = useState<File | null>(null);
  const [letterImageFile, setLetterImageFile] = useState<File | null>(null);
  const [backgroundMusicFile, setBackgroundMusicFile] = useState<File | null>(null);
  const [cakeImageFile, setCakeImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    required: true,
    intro: false,
    letter: false,
    special: false,
    quiz: false,
    love: false,
    heart: false,
    bouquet: false,
    reveal: false,
    heartUnion: false,
    cake: false,
    playlist: false,
    journey: false,
    specialWishes: false,
    finalWish: false,
    backgroundMusic: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleUpdate = (path: string, value: any) => {
    setData((prev) => {
      const newData = { ...prev };
      const parts = path.split('.');
      let current: any = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return { ...newData };
    });
  };

  const uploadFile = async (file: File, key: string): Promise<{ url: string; file: File } | null> => {
    setUploadingStates(prev => ({ ...prev, [key]: true }));
    try {
      let fileToUpload = file;

      // Automatically compress if it's an image and larger than 2MB
      if (file.type.startsWith('image/') && file.size > 2 * 1024 * 1024) {
        console.log(`Compressing ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)...`);
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          fileToUpload = new File([compressedFile], file.name, { type: file.type });
          console.log(`Compressed to ${(fileToUpload.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (error) {
          console.warn("Compression failed, uploading original file:", error);
        }
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let message = "Upload failed";
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || message;
        } catch (e) {
          message = `Server Error (${response.status}): ${errorText.substring(0, 100)}`;
        }
        throw new Error(message);
      }

      const result = await response.json();
      if (result.status === "success") {
        return { url: result.url, file: fileToUpload };
      }
      throw new Error(result.message || "Upload failed");
    } catch (error) {
      console.error("Upload error details:", error);
      const msg = error instanceof Error ? error.message : "Unknown upload error";
      setErrorMessage(`Upload failed: ${msg}`);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return null;
    } finally {
      setUploadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleIntroImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `intro_${index}`);
      if (result) {
        setIntroImageFiles(prev => ({ ...prev, [index]: result.file }));
        const newImages = [...data.config.intro.images];
        newImages[index] = result.url;
        handleUpdate("config.intro.images", newImages);
      }
    }
  };

  const handleTimelineImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `timeline_${index}`);
      if (result) {
        setTimelineImageFiles(prev => ({ ...prev, [index]: result.file }));
        const newTimeline = [...data.config.crushHistory.timeline];
        newTimeline[index].img = result.url;
        handleUpdate("config.crushHistory.timeline", newTimeline);
      }
    }
  };

  const handleSpecialImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `special_${index}`);
      if (result) {
        setSpecialImageFiles(prev => ({ ...prev, [index]: result.file }));
        const newReasons = [...data.config.whyILikeHer.reasons];
        newReasons[index].img = result.url;
        handleUpdate("config.whyILikeHer.reasons", newReasons);
      }
    }
  };

  const handleSpecialWishImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `wish_${index}`);
      if (result) {
        setSpecialWishesImageFiles(prev => ({ ...prev, [index]: result.file }));
        const newWishes = [...data.config.specialWishes.wishes];
        newWishes[index].img = result.url;
        handleUpdate("config.specialWishes.wishes", newWishes);
      }
    }
  };

  const handleSongFileUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `song_${index}`);
      if (result) {
        setSongFiles(prev => ({ ...prev, [index]: result.file }));
        handleUpdate(`config.playlist.songs.${index}.url`, result.url);
      }
    }
  };

  const handleHeartGameImageUpload = async (type: 'falling' | 'success', e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `heart_${type}`);
      if (result) {
        setHeartGameImageFiles(prev => ({ ...prev, [type]: result.file }));
        if (type === 'falling') {
          handleUpdate("config.heartGame.fallingHeartsImg", result.url);
        } else {
          handleUpdate("config.heartGame.successImg", result.url);
        }
      }
    }
  };

  const handleRevealImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `reveal_${index}`);
      if (result) {
        setRevealImageFiles(prev => ({ ...prev, [index]: result.file }));
        const newItems = [...data.config.reveal.items];
        newItems[index].img = result.url;
        handleUpdate("config.reveal.items", newItems);
      }
    }
  };

  const handleLoveImageUpload = async (type: 'question' | 'success', e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, `love_${type}`);
      if (result) {
        setLoveImageFiles(prev => ({ ...prev, [type]: result.file }));
        if (type === 'question') {
          handleUpdate("config.doYouLoveMe.questionImg", result.url);
        } else {
          handleUpdate("config.doYouLoveMe.successImg", result.url);
        }
      }
    }
  };

  const handleLetterImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "letter");
      if (result) {
        setLetterImageFile(result.file);
        handleUpdate("config.letter.letterImg", result.url);
      }
    }
  };

  const handleBackgroundMusicUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "bg_music");
      if (result) {
        setBackgroundMusicFile(result.file);
        handleUpdate("config.backgroundMusic.url", result.url);
      }
    }
  };

  const handleCakeImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "cake");
      if (result) {
        setCakeImageFile(result.file);
        handleUpdate("config.cake.cakeImg", result.url);
      }
    }
  };

  const handlePlaylistCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "playlist_cover");
      if (result) {
        setPlaylistCoverFile(result.file);
        handleUpdate("config.playlist.coverImage", result.url);
      }
    }
  };

  const handleHolyRequestImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "holy_request");
      if (result) {
        setHolyRequestImageFile(result.file);
        handleUpdate("config.holyRequest.requestImg", result.url);
      }
    }
  };

  const handlePaymentReceiptUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadFile(file, "payment_receipt");
      if (result) {
        setPaymentPdfFile(result.file);
      }
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const email = userEmail.trim();
    if (!email) {
      setErrorMessage("Please enter your email address");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    if (!paymentPdfFile && !autoFilledPdfUrl) {
      setErrorMessage("Please upload payment receipt PDF");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    
    try {
      const formData = new FormData();
      formData.append("userEmail", userEmail);
      formData.append("configData", JSON.stringify(data.config));
      
      // Append files
      if (paymentPdfFile) {
        formData.append("paymentPdf", paymentPdfFile);
      } else if (autoFilledPdfUrl) {
        formData.append("autoFilledPdfUrl", autoFilledPdfUrl);
      }
      if (playlistCoverFile) formData.append("playlistCover", playlistCoverFile);
      if (cakeImageFile) formData.append("cakeFile", cakeImageFile);
      if (holyRequestImageFile) formData.append("holyRequestFile", holyRequestImageFile);
      if (letterImageFile) formData.append("letterFile", letterImageFile);
      if (backgroundMusicFile) formData.append("backgroundMusicFile", backgroundMusicFile);

      // Append multi-file sections
      Object.entries(introImageFiles).forEach(([index, file]) => {
        formData.append(`introFile_${index}`, file as File);
      });
      Object.entries(timelineImageFiles).forEach(([index, file]) => {
        formData.append(`timelineFile_${index}`, file as File);
      });
      Object.entries(specialImageFiles).forEach(([index, file]) => {
        formData.append(`specialFile_${index}`, file as File);
      });
      Object.entries(specialWishesImageFiles).forEach(([index, file]) => {
        formData.append(`specialWishesFile_${index}`, file as File);
      });
      Object.entries(heartGameImageFiles).forEach(([type, file]) => {
        formData.append(`heartGameFile_${type}`, file as File);
      });
      Object.entries(loveImageFiles).forEach(([type, file]) => {
        formData.append(`loveFile_${type}`, file as File);
      });
      Object.entries(revealImageFiles).forEach(([index, file]) => {
        formData.append(`revealFile_${index}`, file as File);
      });
      Object.entries(songFiles).forEach(([index, file]) => {
        formData.append(`songFile_${index}`, file as File);
      });

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.status === "error") {
        throw new Error(result.message || "Submission failed");
      }

      setSubmitStatus("success");
      // Reset form
      setUserEmail("");
      setPaymentPdfFile(null);
      setAutoFilledPdfUrl(null);
      setPlaylistCoverFile(null);
      setIntroImageFiles({});
      setTimelineImageFiles({});
      setSpecialImageFiles({});
      setHeartGameImageFiles({});
      setLoveImageFiles({});
      setRevealImageFiles({});
      setSpecialWishesImageFiles({});
      setHolyRequestImageFile(null);
      setLetterImageFile(null);
      setBackgroundMusicFile(null);
      setCakeImageFile(null);
      setSongFiles({});
      
    } catch (err) {
      console.error(err);
      setErrorMessage((err as Error).message || "Submission failed");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const NavigationButtons = () => (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className={cn(
          "px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
          currentStep === 0 
            ? "text-slate-300 cursor-not-allowed" 
            : "text-slate-500 hover:text-primary hover:bg-primary/5"
        )}
      >
        <Send size={16} className="rotate-180" /> BACK
      </button>

      {currentStep < STEPS.length - 1 ? (
        <button
          onClick={nextStep}
          className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          NEXT <Send size={16} />
        </button>
      ) : (
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === "success"}
          className={cn(
            "px-10 py-3 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 transition-all",
            submitStatus === "success" 
              ? "bg-emerald-500 text-white shadow-xl shadow-emerald-200" 
              : "bg-slate-900 text-white shadow-xl shadow-slate-200 ring-4 ring-white hover:ring-slate-100 hover:scale-105 active:scale-95"
          )}
        >
          {isSubmitting ? (
            <RefreshCw size={20} className="animate-spin" />
          ) : submitStatus === "success" ? (
            <Check size={20} />
          ) : (
            <Send size={20} />
          )}
          {isSubmitting ? "SAVING..." : submitStatus === "success" ? "DONE!" : "SUBMIT FORM"}
        </button>
      )}
    </div>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fdfcfb] font-sans text-slate-800 transition-colors duration-500">
        <Navbar />

        <Routes>
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<div className="pt-40 text-center text-slate-400 font-black uppercase tracking-widest">Terms Page Coming Soon</div>} />
          <Route path="/store" element={<div className="pt-40 text-center text-slate-400 font-black uppercase tracking-widest underline underline-offset-8 decoration-primary/30"><a href="https://www.arhambuilds.in/" target="_blank" rel="noopener noreferrer">Visit External Store <ArrowRight className="inline-block" size={16} /></a></div>} />
          <Route path="/" element={
            <div className="pt-28 pb-20 px-4 md:px-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-4 ring-1 ring-primary/20">
                      <Sparkles size={14} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Step {currentStep + 1} of {STEPS.length}</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Form Editor</h1>
                    <p className="text-slate-400 text-sm font-medium">Step: {STEPS[currentStep].label}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mb-10 overflow-hidden flex">
                    {STEPS.map((step, idx) => (
                      <div 
                        key={step.id}
                        className={cn(
                          "h-full flex-1 transition-all duration-500",
                          idx <= currentStep ? "bg-primary" : "bg-transparent",
                          idx === currentStep && "animate-pulse"
                        )}
                      />
                    ))}
                  </div>

                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                  {/* Step Sections */}
                  {STEPS[currentStep].id === 'required' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Mail size={18} className="text-primary" /> Required Information
                        </h3>
                      </div>
                      
                      <div className="px-6 py-8 md:px-8 space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Your Email Address *</label>
                          <input 
                            type="email"
                            placeholder="your.email@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none font-medium transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Payment Receipt (PDF) *</label>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                              {!autoFilledPdfUrl && (
                                <input 
                                  type="file"
                                  accept=".pdf"
                                  onChange={handlePaymentReceiptUpload}
                                  className="w-full opacity-0 absolute inset-0 cursor-pointer z-10"
                                  required={!autoFilledPdfUrl}
                                />
                              )}
                              <div className={cn(
                                "w-full bg-slate-50 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm flex items-center justify-between transition-all",
                                autoFilledPdfUrl && "bg-emerald-50 border-emerald-100"
                              )}>
                                <span className={cn(
                                  "truncate pr-4 font-medium", 
                                  uploadingStates.payment_receipt ? "text-primary animate-pulse" : 
                                  autoFilledPdfUrl ? "text-emerald-600" : "text-slate-400"
                                )}>
                                  {uploadingStates.payment_receipt ? "Uploading to Cloudinary..." : 
                                   autoFilledPdfUrl ? "Attached from redirect (Secure URL)" :
                                   (paymentPdfFile ? paymentPdfFile.name : "Choose PDF receipt...")}
                                </span>
                                {autoFilledPdfUrl ? (
                                  <Link2 size={18} className="text-emerald-400" />
                                ) : (
                                  <Upload size={18} className="text-slate-300" />
                                )}
                              </div>
                            </div>
                            {(paymentPdfFile || autoFilledPdfUrl) && (
                              <button 
                                onClick={() => {
                                  setPaymentPdfFile(null);
                                  setAutoFilledPdfUrl(null);
                                }}
                                className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'backgroundMusic' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Flower2 size={18} className="text-primary" /> Background Music
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-6">
                        <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-6 max-w-md mx-auto">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center">Main Music Track</label>
                          
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">MUSIC URL</label>
                              <input 
                                type="text"
                                value={data.config.backgroundMusic.url.startsWith('data:') ? "" : data.config.backgroundMusic.url}
                                onChange={(e) => {
                                  setBackgroundMusicFile(null);
                                  handleUpdate("config.backgroundMusic.url", e.target.value);
                                }}
                                className="w-full bg-white border border-slate-200/60 rounded-2xl px-5 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                placeholder="Paste audio URL here..."
                              />
                            </div>

                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200"></span>
                              </div>
                              <div className="relative flex justify-center text-[10px] uppercase font-bold">
                                <span className="bg-[#fcfbf9] px-3 text-slate-300">OR</span>
                              </div>
                            </div>

                            <label className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary/30 hover:bg-slate-50 transition-all shadow-sm">
                              <Upload size={18} className={cn("text-primary", uploadingStates.bg_music && "animate-spin")} />
                              <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                {uploadingStates.bg_music ? "UPLOADING..." : "UPLOAD AUDIO"}
                              </span>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="audio/*" 
                                onChange={handleBackgroundMusicUpload} 
                                disabled={uploadingStates.bg_music}
                              />
                            </label>

                            {backgroundMusicFile && (
                              <div className="flex items-center justify-between bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100">
                                <div className="flex items-center gap-3 text-emerald-600">
                                  <Check size={14} strokeWidth={3} />
                                  <span className="text-[11px] font-bold uppercase truncate max-w-[200px]">
                                    {backgroundMusicFile.name}
                                  </span>
                                </div>
                                <button 
                                  onClick={() => {
                                    setBackgroundMusicFile(null);
                                    handleUpdate("config.backgroundMusic.url", DEFAULT_DATA.config.backgroundMusic.url);
                                  }}
                                  className="text-emerald-400 hover:text-rose-500 transition-colors p-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}

                            {data.config.backgroundMusic.url && (
                              <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
                                <audio 
                                  key={data.config.backgroundMusic.url}
                                  controls 
                                  className="w-full h-10"
                                >
                                  <source src={data.config.backgroundMusic.url} />
                                </audio>
                              </div>
                            )}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'intro' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Layout size={18} className="text-primary" /> Intro Stage
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-6">
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 mb-3 block uppercase tracking-wider">Main Title</label>
                          <textarea 
                            value={data.config.intro.title}
                            onChange={(e) => handleUpdate("config.intro.title", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm transition-all focus:ring-4 focus:ring-primary/10 outline-none min-h-[120px] font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 mb-4 block uppercase tracking-wider">Intro Cover Images (2 Slots)</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.config.intro.images.map((imgUrl, idx) => (
                              <div key={idx} className="space-y-4 p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Image Slot {idx + 1}</label>
                                {imgUrl && (
                                  <div 
                                    className="w-full rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-zoom-in bg-white relative aspect-video"
                                    onClick={() => setPreviewImage(imgUrl)}
                                  >
                                    <img 
                                      src={imgUrl} 
                                      alt={`Intro ${idx + 1} Preview`} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Eye className="text-white" size={24} />
                                    </div>
                                  </div>
                                )}
                                <div className="space-y-4">
                                  <div className="flex flex-col gap-3">
                                    <input 
                                      type="text"
                                      value={imgUrl.startsWith('data:') ? "" : imgUrl}
                                      onChange={(e) => {
                                        const newFiles = { ...introImageFiles };
                                        delete newFiles[idx];
                                        setIntroImageFiles(newFiles);
                                        const newImages = [...data.config.intro.images];
                                        newImages[idx] = e.target.value;
                                        handleUpdate("config.intro.images", newImages);
                                      }}
                                      className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                      placeholder="Paste URL here..."
                                    />
                                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                      <Upload size={14} className={cn("text-primary", uploadingStates[`intro_${idx}`] && "animate-spin")} />
                                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                        {uploadingStates[`intro_${idx}`] ? "UPLOADING..." : "UPLOAD FILE"}
                                      </span>
                                      <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={(e) => handleIntroImageUpload(idx, e)} 
                                        disabled={uploadingStates[`intro_${idx}`]}
                                      />
                                    </label>
                                  </div>
                                  
                                  {introImageFiles[idx] && (
                                    <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                      <div className="flex items-center gap-3 text-emerald-600">
                                        <Check size={14} strokeWidth={3} />
                                        <span className="text-[11px] font-bold uppercase truncate max-w-[150px]">{introImageFiles[idx].name}</span>
                                      </div>
                                      <button onClick={() => {
                                        const newFiles = { ...introImageFiles };
                                        delete newFiles[idx];
                                        setIntroImageFiles(newFiles);
                                        const newImages = [...data.config.intro.images];
                                        newImages[idx] = "";
                                        handleUpdate("config.intro.images", newImages);
                                      }} className="text-emerald-400 hover:text-rose-500 p-1">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'journey' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Sparkles size={18} className="text-primary" /> Journey Timeline
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-6">
                        {data.config.crushHistory.timeline.map((item, i) => (
                          <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-200/50 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">YEAR</label>
                                <input 
                                  placeholder="Year" 
                                  value={item.year} 
                                  onChange={(e) => {
                                    const newT = [...data.config.crushHistory.timeline];
                                    newT[i].year = e.target.value;
                                    handleUpdate("config.crushHistory.timeline", newT);
                                  }}
                                  className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">LABEL</label>
                                <input 
                                  placeholder="Label" 
                                  value={item.label} 
                                  onChange={(e) => {
                                    const newT = [...data.config.crushHistory.timeline];
                                    newT[i].label = e.target.value;
                                    handleUpdate("config.crushHistory.timeline", newT);
                                  }}
                                  className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">DESCRIPTION</label>
                              <textarea 
                                placeholder="Description" 
                                value={item.text} 
                                onChange={(e) => {
                                  const newT = [...data.config.crushHistory.timeline];
                                  newT[i].text = e.target.value;
                                  handleUpdate("config.crushHistory.timeline", newT);
                                }}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[80px]"
                              />
                            </div>

                            <div className="pt-2 space-y-4">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Memory Image</label>
                              
                              {item.img && (
                                <div 
                                  className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-md cursor-zoom-in bg-white relative group"
                                  onClick={() => setPreviewImage(item.img)}
                                >
                                  <img 
                                    src={item.img} 
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    alt={`Timeline ${i} preview`}
                                  />
                                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="text-white" size={18} />
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <input 
                                  type="text"
                                  value={item.img.startsWith('data:') ? "" : item.img}
                                  onChange={(e) => {
                                    const newFiles = { ...timelineImageFiles };
                                    delete newFiles[i];
                                    setTimelineImageFiles(newFiles);
                                    const newTimeline = [...data.config.crushHistory.timeline];
                                    newTimeline[i].img = e.target.value;
                                    handleUpdate("config.crushHistory.timeline", newTimeline);
                                  }}
                                  className="flex-1 bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-[11px] outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                  placeholder="Paste image URL here..."
                                />
                                <label className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm shrink-0">
                                  <Upload size={14} className={cn("text-primary", uploadingStates[`timeline_${i}`] && "animate-spin")} />
                                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    {uploadingStates[`timeline_${i}`] ? "UPLOADING..." : "UPLOAD"}
                                  </span>
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={(e) => handleTimelineImageUpload(i, e)} 
                                    disabled={uploadingStates[`timeline_${i}`]}
                                  />
                                </label>
                              </div>

                              {timelineImageFiles[i] && (
                                <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                  <div className="flex items-center gap-3 text-emerald-600">
                                    <Check size={14} strokeWidth={3} />
                                    <span className="text-[11px] font-bold uppercase truncate max-w-[200px] font-medium">{timelineImageFiles[i].name}</span>
                                  </div>
                                  <button onClick={() => {
                                    const newFiles = { ...timelineImageFiles };
                                    delete newFiles[i];
                                    setTimelineImageFiles(newFiles);
                                    const newTimeline = [...data.config.crushHistory.timeline];
                                    newTimeline[i].img = "";
                                    handleUpdate("config.crushHistory.timeline", newTimeline);
                                  }} className="text-emerald-400 hover:text-rose-500 p-1">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'special' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Sparkles size={18} className="text-primary" /> Why You Are Special
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-6">
                        <div className="space-y-6">
                          {data.config.whyILikeHer.reasons.map((reason, index) => (
                            <div key={index} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-200/50 space-y-5">
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-black text-primary shrink-0 border border-primary/20 shadow-sm">
                                  {index + 1}
                                </div>
                                <div className="flex-1 space-y-1.5">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">THE REASON</label>
                                  <input 
                                    type="text"
                                    value={reason.text}
                                    onChange={(e) => {
                                      const newReasons = [...data.config.whyILikeHer.reasons];
                                      newReasons[index].text = e.target.value;
                                      handleUpdate("config.whyILikeHer.reasons", newReasons);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                    placeholder={`Reason #${index + 1}`}
                                  />
                                </div>
                              </div>

                              <div className="pl-14 space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reason Image</label>
                                
                                {reason.img && (
                                  <div 
                                    className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-md cursor-zoom-in bg-white relative group"
                                    onClick={() => setPreviewImage(reason.img)}
                                  >
                                    <img 
                                      src={reason.img} 
                                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                      alt={`Reason ${index + 1} preview`}
                                    />
                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Eye className="text-white" size={18} />
                                    </div>
                                  </div>
                                )}

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                  <input 
                                    type="text"
                                    value={reason.img.startsWith('data:') ? "" : reason.img}
                                    onChange={(e) => {
                                      const newFiles = { ...specialImageFiles };
                                      delete newFiles[index];
                                      setSpecialImageFiles(newFiles);
                                      const newReasons = [...data.config.whyILikeHer.reasons];
                                      newReasons[index].img = e.target.value;
                                      handleUpdate("config.whyILikeHer.reasons", newReasons);
                                    }}
                                    className="flex-1 bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-[11px] outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                    placeholder="Paste image URL here..."
                                  />
                                  <label className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm shrink-0">
                                    <Upload size={14} className={cn("text-primary", uploadingStates[`special_${index}`] && "animate-spin")} />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                      {uploadingStates[`special_${index}`] ? "UPLOADING..." : "UPLOAD"}
                                    </span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*" 
                                      onChange={(e) => handleSpecialImageUpload(index, e)} 
                                      disabled={uploadingStates[`special_${index}`]}
                                    />
                                  </label>
                                </div>

                                {specialImageFiles[index] && (
                                  <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center gap-3 text-emerald-600">
                                      <Check size={14} strokeWidth={3} />
                                      <span className="text-[11px] font-bold uppercase truncate max-w-[200px] font-medium">{specialImageFiles[index].name}</span>
                                    </div>
                                    <button onClick={() => {
                                      const newFiles = { ...specialImageFiles };
                                      delete newFiles[index];
                                      setSpecialImageFiles(newFiles);
                                      const newReasons = [...data.config.whyILikeHer.reasons];
                                      newReasons[index].img = "";
                                      handleUpdate("config.whyILikeHer.reasons", newReasons);
                                    }} className="text-emerald-400 hover:text-rose-500 p-1">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'quiz' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <HelpCircle size={18} className="text-primary" /> Birthday Quiz
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-6">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => {
                              const newQuests = [...data.config.mcqGame.questions];
                              newQuests.push({ q: "", opts: ["", "", "", ""], correct: 0 });
                              handleUpdate("config.mcqGame.questions", newQuests);
                            }}
                            className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-primary/20 transition-all border border-primary/10 uppercase tracking-widest shadow-sm"
                          >
                            <Plus size={14} /> ADD QUESTION
                          </button>
                        </div>
                        <div className="space-y-6">
                          {data.config.mcqGame.questions.map((q, qIndex) => (
                            <div key={qIndex} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-5 relative group">
                              <button 
                                onClick={() => {
                                  const newQuests = [...data.config.mcqGame.questions];
                                  newQuests.splice(qIndex, 1);
                                  handleUpdate("config.mcqGame.questions", newQuests);
                                }}
                                className="absolute right-4 top-4 text-rose-400 p-2 hover:bg-rose-50 rounded-2xl transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-black text-slate-400 pl-1 tracking-widest">Question {qIndex + 1}</label>
                                <input 
                                  type="text"
                                  value={q.q}
                                  onChange={(e) => {
                                    const newQuests = [...data.config.mcqGame.questions];
                                    newQuests[qIndex].q = e.target.value;
                                    handleUpdate("config.mcqGame.questions", newQuests);
                                  }}
                                  className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                  placeholder="Type your question here..."
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {q.opts.map((opt, oIndex) => (
                                  <div key={oIndex} className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-2">Option {oIndex + 1}</label>
                                    <div className="flex items-center gap-3 relative group/opt">
                                      <div className="relative">
                                        <input 
                                          type="radio" 
                                          name={`correct-${qIndex}`}
                                          checked={q.correct === oIndex}
                                          onChange={() => {
                                            const newQuests = [...data.config.mcqGame.questions];
                                            newQuests[qIndex].correct = oIndex;
                                            handleUpdate("config.mcqGame.questions", newQuests);
                                          }}
                                          className="w-5 h-5 cursor-pointer accent-primary"
                                        />
                                      </div>
                                      <input 
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const newQuests = [...data.config.mcqGame.questions];
                                          newQuests[qIndex].opts[oIndex] = e.target.value;
                                          handleUpdate("config.mcqGame.questions", newQuests);
                                        }}
                                        className="flex-1 bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="Option text..."
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'love' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Heart size={18} className="text-primary" /> Do You Love Me?
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Section Title</label>
                            <input 
                              type="text"
                              value={data.config.doYouLoveMe.title}
                              onChange={(e) => handleUpdate("config.doYouLoveMe.title", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Hint Text</label>
                            <input 
                              type="text"
                              value={data.config.doYouLoveMe.hintText}
                              onChange={(e) => handleUpdate("config.doYouLoveMe.hintText", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">"YES" Button Text</label>
                            <div className="relative group">
                              <input 
                                type="text"
                                value={data.config.doYouLoveMe.yesButton}
                                onChange={(e) => handleUpdate("config.doYouLoveMe.yesButton", e.target.value)}
                                className="w-full bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm focus:ring-4 focus:ring-emerald-100 transition-all"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400"></div>
                            </div>
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">"NO" Button Text</label>
                            <div className="relative group">
                              <input 
                                type="text"
                                value={data.config.doYouLoveMe.noButton}
                                onChange={(e) => handleUpdate("config.doYouLoveMe.noButton", e.target.value)}
                                className="w-full bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm focus:ring-4 focus:ring-rose-100 transition-all"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-400"></div>
                            </div>
                          </div>
                        </div>

                        {/* Love Images */}
                        <div className="space-y-6 pt-8 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block pl-1">Confession Images (2 Slots)</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                              { label: "Main Question Image", key: "questionImg", fileKey: "question" },
                              { label: "YES Success Image", key: "successImg", fileKey: "success" }
                            ].map((slot, i) => (
                              <div key={i} className="space-y-4 p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                                  {slot.label}
                                </label>
                                
                                <div 
                                  className="aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-zoom-in bg-white relative"
                                  onClick={() => setPreviewImage((data.config.doYouLoveMe as any)[slot.key])}
                                >
                                  <img 
                                    src={(data.config.doYouLoveMe as any)[slot.key]} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt={`${slot.label} preview`}
                                  />
                                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="text-white" size={24} />
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <input 
                                    type="text"
                                    value={(data.config.doYouLoveMe as any)[slot.key]}
                                    onChange={(e) => {
                                      const newFiles = { ...loveImageFiles };
                                      delete newFiles[slot.fileKey];
                                      setLoveImageFiles(newFiles);
                                      handleUpdate(`config.doYouLoveMe.${slot.key}`, e.target.value);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                    placeholder="Paste URL here..."
                                  />
                                  
                                  <label className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                    <Upload size={16} className={cn("text-primary", uploadingStates[`love_${slot.fileKey}`] && "animate-spin")} />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                      {uploadingStates[`love_${slot.fileKey}`] ? "UPLOADING..." : "UPLOAD"}
                                    </span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*" 
                                      onChange={(e) => handleLoveImageUpload(slot.fileKey as 'question' | 'success', e)} 
                                      disabled={uploadingStates[`love_${slot.fileKey}`]}
                                    />
                                  </label>
                                  
                                  {loveImageFiles[slot.fileKey] && (
                                    <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                      <div className="flex items-center gap-3 text-emerald-600">
                                        <Check size={14} strokeWidth={3} />
                                        <span className="text-[11px] font-bold uppercase truncate max-w-[150px] font-medium">
                                          {loveImageFiles[slot.fileKey].name}
                                        </span>
                                      </div>
                                      <button onClick={() => {
                                        const newFiles = { ...loveImageFiles };
                                        delete newFiles[slot.fileKey];
                                        setLoveImageFiles(newFiles);
                                        handleUpdate(`config.doYouLoveMe.${slot.key}`, "");
                                      }} className="text-emerald-400 hover:text-rose-500 p-1">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'heart' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Heart size={18} className="text-rose-500" /> Heart Game
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Game Title</label>
                            <input 
                              type="text"
                              value={data.config.heartGame.title}
                              onChange={(e) => handleUpdate("config.heartGame.title", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-rose-100 transition-all shadow-inner"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Target Score</label>
                            <input 
                              type="number"
                              value={data.config.heartGame.targetScore}
                              onChange={(e) => handleUpdate("config.heartGame.targetScore", parseInt(e.target.value))}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-rose-100 transition-all shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Success Message Title</label>
                            <input 
                              type="text"
                              value={data.config.heartGame.successTitle}
                              onChange={(e) => handleUpdate("config.heartGame.successTitle", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-100 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Success Subtext</label>
                            <textarea 
                              value={data.config.heartGame.successSub}
                              onChange={(e) => handleUpdate("config.heartGame.successSub", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[120px] focus:ring-4 focus:ring-emerald-100 transition-all font-medium resize-none shadow-sm"
                              placeholder="Describe how much they mastered the game..."
                            />
                          </div>
                        </div>

                        {/* Game Images */}
                        <div className="space-y-6 pt-8 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block pl-1">Game Visuals (2 Slots)</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                              { label: "Falling Hearts Animation", key: "fallingHeartsImg", fileKey: "falling" },
                              { label: "Victory Success Image", key: "successImg", fileKey: "success" }
                            ].map((slot, i) => (
                              <div key={i} className="space-y-4 p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                                  {slot.label}
                                </label>
                                
                                <div 
                                  className="aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-zoom-in bg-white relative"
                                  onClick={() => setPreviewImage((data.config.heartGame as any)[slot.key])}
                                >
                                  <img 
                                    src={(data.config.heartGame as any)[slot.key]} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt={`${slot.label} preview`}
                                  />
                                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="text-white" size={24} />
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <input 
                                    type="text"
                                    value={(data.config.heartGame as any)[slot.key]}
                                    onChange={(e) => {
                                      const newFiles = { ...heartGameImageFiles };
                                      delete newFiles[slot.fileKey];
                                      setHeartGameImageFiles(newFiles);
                                      handleUpdate(`config.heartGame.${slot.key}`, e.target.value);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium"
                                    placeholder="Paste URL here..."
                                  />
                                  
                                  <label className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                    <Upload size={16} className={cn("text-primary", uploadingStates[`heart_${slot.fileKey}`] && "animate-spin")} />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                      {uploadingStates[`heart_${slot.fileKey}`] ? "UPLOADING..." : "UPLOAD"}
                                    </span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*" 
                                      onChange={(e) => handleHeartGameImageUpload(slot.fileKey as 'falling' | 'success', e)} 
                                      disabled={uploadingStates[`heart_${slot.fileKey}`]}
                                    />
                                  </label>
                                  
                                  {heartGameImageFiles[slot.fileKey] && (
                                    <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                      <div className="flex items-center gap-3 text-emerald-600">
                                        <Check size={14} strokeWidth={3} />
                                        <span className="text-[11px] font-bold uppercase truncate max-w-[150px] font-medium">
                                          {heartGameImageFiles[slot.fileKey].name}
                                        </span>
                                      </div>
                                      <button onClick={() => {
                                        const newFiles = { ...heartGameImageFiles };
                                        delete newFiles[slot.fileKey];
                                        setHeartGameImageFiles(newFiles);
                                        handleUpdate(`config.heartGame.${slot.key}`, "");
                                      }} className="text-emerald-400 hover:text-rose-500 p-1">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'bouquet' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Flower2 size={18} className="text-primary" /> Make a Bouquet
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Bouquet Title</label>
                            <input 
                              type="text"
                              value={data.config.bouquet.title}
                              onChange={(e) => handleUpdate("config.bouquet.title", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Button Text</label>
                            <input 
                              type="text"
                              value={data.config.bouquet.buttonText}
                              onChange={(e) => handleUpdate("config.bouquet.buttonText", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Success Message (Title)</label>
                            <input 
                              type="text"
                              value={data.config.bouquet.successMessage}
                              onChange={(e) => handleUpdate("config.bouquet.successMessage", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-100 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Final Heartfelt Message</label>
                            <textarea 
                              value={data.config.bouquet.finalMessage}
                              onChange={(e) => handleUpdate("config.bouquet.finalMessage", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[140px] focus:ring-4 focus:ring-emerald-100 transition-all font-medium resize-none shadow-sm"
                            />
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'cake' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Cake size={18} className="text-[#ff4d6d]" /> Strawberry Cake
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Cake Stage Title</label>
                          <input 
                            type="text"
                            value={data.config.cake.title}
                            onChange={(e) => handleUpdate("config.cake.title", e.target.value)}
                            className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-[#ff4d6d]/10 transition-all shadow-inner"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Birthday Wish Message</label>
                            <textarea 
                              value={data.config.cake.birthdayMessage}
                              onChange={(e) => handleUpdate("config.cake.birthdayMessage", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[100px] font-medium resize-none shadow-sm focus:ring-4 focus:ring-[#ff4d6d]/10 transition-all"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Final Wish Message</label>
                            <textarea 
                              value={data.config.cake.finalWishMessage}
                              onChange={(e) => handleUpdate("config.cake.finalWishMessage", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[100px] font-bold resize-none shadow-sm focus:ring-4 focus:ring-emerald-100 transition-all"
                            />
                          </div>
                        </div>

                        {/* Cake Image Slot */}
                        <div className="space-y-6 pt-8 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center">Cake Visual</label>
                          <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-4 max-w-md mx-auto group">
                            <div 
                              className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-xl cursor-zoom-in bg-white relative"
                              onClick={() => setPreviewImage(data.config.cake.cakeImg)}
                            >
                              <img 
                                src={data.config.cake.cakeImg} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Cake preview"
                              />
                              <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="text-white" size={28} />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <input 
                                type="text"
                                value={data.config.cake.cakeImg.startsWith('data:') ? "" : data.config.cake.cakeImg}
                                onChange={(e) => {
                                  setCakeImageFile(null);
                                  handleUpdate("config.cake.cakeImg", e.target.value);
                                }}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-[#ff4d6d]/10 transition-all font-medium"
                                placeholder="Paste image URL here..."
                              />
                              
                              <label className="flex items-center justify-center gap-3 w-full py-3.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                <Upload size={18} className={cn("text-[#ff4d6d]", uploadingStates.cake && "animate-spin")} />
                                <span className="text-[10px] font-black text-[#ff4d6d] uppercase tracking-widest">
                                  {uploadingStates.cake ? "UPLOADING..." : "UPLOAD CAKE IMAGE"}
                                </span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*" 
                                  onChange={handleCakeImageUpload} 
                                  disabled={uploadingStates.cake}
                                />
                              </label>

                              {cakeImageFile && (
                                <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                  <div className="flex items-center gap-3 text-emerald-600 font-medium">
                                    <Check size={14} strokeWidth={3} />
                                    <span className="text-[11px] font-bold uppercase truncate max-w-[220px]">
                                      {cakeImageFile.name}
                                    </span>
                                  </div>
                                  <button onClick={() => {
                                    setCakeImageFile(null);
                                    handleUpdate("config.cake.cakeImg", "");
                                  }} className="text-emerald-400 hover:text-rose-500 p-1">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'reveal' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Gift size={18} className="text-primary" /> Gifts For You
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Section Title</label>
                          <input 
                            type="text"
                            value={data.config.reveal.title}
                            onChange={(e) => handleUpdate("config.reveal.title", e.target.value)}
                            className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                          />
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block pl-1">Gift Items (6 Items + Images)</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.config.reveal.items.map((item, i) => (
                              <div key={i} className="p-5 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-4 group">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Gift {i + 1} Name</label>
                                  <input 
                                    type="text"
                                    value={item.text}
                                    onChange={(e) => {
                                      const newItems = [...data.config.reveal.items];
                                      newItems[i].text = e.target.value;
                                      handleUpdate("config.reveal.items", newItems);
                                    }}
                                    className="w-full bg-white border border-slate-200/60 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                                  />
                                </div>
                                
                                <div 
                                  className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-zoom-in bg-white relative"
                                  onClick={() => setPreviewImage(item.img)}
                                >
                                  <img 
                                    src={item.img} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt={`Gift ${i + 1} preview`}
                                  />
                                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="text-white" size={24} />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <input 
                                    type="text"
                                    value={item.img.startsWith('data:') ? "" : item.img}
                                    onChange={(e) => {
                                      const newFiles = { ...revealImageFiles };
                                      delete newFiles[i];
                                      setRevealImageFiles(newFiles);
                                      const newItems = [...data.config.reveal.items];
                                      newItems[i].img = e.target.value;
                                      handleUpdate("config.reveal.items", newItems);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2 text-[11px] outline-none font-medium"
                                    placeholder="Paste URL here..."
                                  />
                                  
                                  <label className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                    <Upload size={14} className={cn("text-primary", uploadingStates[`reveal_${i}`] && "animate-spin")} />
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                      {uploadingStates[`reveal_${i}`] ? "UPLOADING..." : "UPLOAD"}
                                    </span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*" 
                                      onChange={(e) => handleRevealImageUpload(i, e)} 
                                      disabled={uploadingStates[`reveal_${i}`]}
                                    />
                                  </label>
                                  
                                  {revealImageFiles[i] && (
                                    <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                                      <div className="flex items-center gap-2 text-emerald-600 font-bold overflow-hidden">
                                        <Check size={12} strokeWidth={3} className="shrink-0" />
                                        <span className="text-[10px] uppercase truncate">
                                          {revealImageFiles[i].name}
                                        </span>
                                      </div>
                                      <button onClick={() => {
                                        const newFiles = { ...revealImageFiles };
                                        delete newFiles[i];
                                        setRevealImageFiles(newFiles);
                                        const newItems = [...data.config.reveal.items];
                                        newItems[i].img = "";
                                        handleUpdate("config.reveal.items", newItems);
                                      }} className="text-emerald-400 hover:text-rose-500 p-1 shrink-0">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'heartUnion' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Sparkles size={18} className="text-primary" /> Unite Love
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Your Name</label>
                            <input 
                              type="text"
                              value={data.config.heartUnion.titleMerged1}
                              onChange={(e) => handleUpdate("config.heartUnion.titleMerged1", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">His/Her Name</label>
                            <input 
                              type="text"
                              value={data.config.heartUnion.titleMerged2}
                              onChange={(e) => handleUpdate("config.heartUnion.titleMerged2", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                              placeholder="Enter their name"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Both Hashtag</label>
                            <div className="relative group">
                              <input 
                                type="text"
                                value={data.config.heartUnion.centerName}
                                onChange={(e) => handleUpdate("config.heartUnion.centerName", e.target.value)}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm pl-10"
                                placeholder="#OurLoveStory"
                              />
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">#</div>
                            </div>
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Tap Instruction / Success Title</label>
                            <input 
                              type="text"
                              value={data.config.heartUnion.tapInstruction}
                              onChange={(e) => handleUpdate("config.heartUnion.tapInstruction", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                            />
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'holyRequest' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Heart size={18} className="text-primary" /> Holy Request
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Label</label>
                          <input 
                            type="text"
                            value={data.config.holyRequest.label}
                            onChange={(e) => handleUpdate("config.holyRequest.label", e.target.value)}
                            className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Main Request Title</label>
                          <textarea 
                            value={data.config.holyRequest.title}
                            onChange={(e) => handleUpdate("config.holyRequest.title", e.target.value)}
                            className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none min-h-[100px] focus:ring-4 focus:ring-primary/10 transition-all shadow-sm resize-none"
                            placeholder="Will you be mine forever?"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Button Text</label>
                          <input 
                            type="text"
                            value={data.config.holyRequest.buttonText}
                            onChange={(e) => handleUpdate("config.holyRequest.buttonText", e.target.value)}
                            className="w-full bg-primary/5 border border-primary/20 text-primary rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm"
                          />
                        </div>

                        {/* Holy Request Image Slot */}
                        <div className="space-y-6 pt-8 border-t border-slate-100 mt-8">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center">Request Visual</label>
                          <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-4 max-w-md mx-auto group">
                            <div 
                              className="aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-xl cursor-zoom-in bg-white relative"
                              onClick={() => setPreviewImage(data.config.holyRequest.requestImg)}
                            >
                              <img 
                                src={data.config.holyRequest.requestImg} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Request preview"
                              />
                            </div>

                            <div className="space-y-3">
                              <input 
                                type="text"
                                value={data.config.holyRequest.requestImg.startsWith('data:') ? "" : data.config.holyRequest.requestImg}
                                onChange={(e) => {
                                  setHolyRequestImageFile(null);
                                  handleUpdate("config.holyRequest.requestImg", e.target.value);
                                }}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                placeholder="Paste image URL here..."
                              />
                              
                              <label className="flex items-center justify-center gap-3 w-full py-3.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                <Upload size={18} className={cn("text-primary", uploadingStates.holy_request && "animate-spin")} />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                  {uploadingStates.holy_request ? "UPLOADING..." : "UPLOAD REQUEST IMAGE"}
                                </span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*" 
                                  onChange={handleHolyRequestImageUpload} 
                                  disabled={uploadingStates.holy_request}
                                />
                              </label>

                              {holyRequestImageFile && (
                                <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                                  <div className="flex items-center gap-3 text-emerald-600 font-medium overflow-hidden">
                                    <Check size={14} strokeWidth={3} className="shrink-0" />
                                    <span className="text-[11px] font-bold uppercase truncate">
                                      {holyRequestImageFile.name}
                                    </span>
                                  </div>
                                  <button onClick={() => {
                                    setHolyRequestImageFile(null);
                                    handleUpdate("config.holyRequest.requestImg", "");
                                  }} className="text-emerald-400 hover:text-rose-500 p-1 shrink-0">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'letter' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Mail size={18} className="text-primary" /> Personal Letter
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Unfold Hint</label>
                            <input 
                              type="text"
                              value={data.config.letter.unfoldHint}
                              onChange={(e) => handleUpdate("config.letter.unfoldHint", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none shadow-inner"
                              placeholder="Click to reveal..."
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Letter Title</label>
                            <input 
                              type="text"
                              value={data.config.letter.title}
                              onChange={(e) => handleUpdate("config.letter.title", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Recipient & Greeting</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input 
                              type="text"
                              value={data.config.letter.recipient}
                              onChange={(e) => handleUpdate("config.letter.recipient", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                              placeholder="To: My Love"
                            />
                            <input 
                              type="text"
                              value={data.config.letter.memoirLabel}
                              onChange={(e) => handleUpdate("config.letter.memoirLabel", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-sm outline-none"
                              placeholder="Memoir Label"
                            />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Letter Content (Paragraphs)</label>
                          <div className="space-y-4">
                            {data.config.letter.paragraphs.map((para, i) => (
                              <div key={i} className="relative group">
                                <textarea
                                  value={para}
                                  onChange={(e) => {
                                    const newParas = [...data.config.letter.paragraphs];
                                    newParas[i] = e.target.value;
                                    handleUpdate("config.letter.paragraphs", newParas);
                                  }}
                                  className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[120px] focus:ring-4 focus:ring-primary/5 transition-all shadow-sm font-serif italic text-slate-700"
                                  placeholder="Write a beautiful paragraph..."
                                />
                                <button 
                                  onClick={() => {
                                    const newParas = [...data.config.letter.paragraphs];
                                    newParas.splice(i, 1);
                                    handleUpdate("config.letter.paragraphs", newParas);
                                  }}
                                  className="absolute -right-3 -top-3 w-8 h-8 bg-white text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg border border-rose-100"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => {
                                const newParas = [...data.config.letter.paragraphs];
                                newParas.push("");
                                handleUpdate("config.letter.paragraphs", newParas);
                              }}
                              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                              <Plus size={16} /> Add New Paragraph
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                          <div className="space-y-4">
                            <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Signature</label>
                            <input 
                              type="text"
                              value={data.config.letter.signatureLabel}
                              onChange={(e) => handleUpdate("config.letter.signatureLabel", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-xs md:text-sm font-medium outline-none"
                              placeholder="With all my love,"
                            />
                            <input 
                              type="text"
                              value={data.config.letter.signatureName}
                              onChange={(e) => handleUpdate("config.letter.signatureName", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-sm font-black outline-none"
                              placeholder="Your Name"
                            />
                          </div>
                          
                          <div className="space-y-6">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center">Letter Image</label>
                            <div className="p-4 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-3 group/img relative">
                              <div 
                                className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg cursor-zoom-in bg-white relative"
                                onClick={() => setPreviewImage(data.config.letter.letterImg)}
                              >
                                <img 
                                  src={data.config.letter.letterImg} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                                  alt="Letter preview"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                  <Upload size={14} className={cn("text-primary", uploadingStates.letter && "animate-spin")} />
                                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    {uploadingStates.letter ? "UPLOADING..." : "CHANGE IMAGE"}
                                  </span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleLetterImageUpload} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'specialWishes' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Sparkles size={18} className="text-primary" /> Special Wishes
                        </h3>
                        <button 
                          onClick={() => {
                            const newWishes = [...data.config.specialWishes.wishes];
                            newWishes.push({ title: "", description: "", sticker: "HEARTS", img: "" });
                            handleUpdate("config.specialWishes.wishes", newWishes);
                          }}
                          className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all"
                        >
                          <Plus size={14} /> Add Wish
                        </button>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Section Title</label>
                          <input 
                            type="text"
                            value={data.config.specialWishes.title}
                            onChange={(e) => handleUpdate("config.specialWishes.title", e.target.value)}
                            className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {data.config.specialWishes.wishes.map((wish, i) => (
                            <div key={i} className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-4 relative group transition-all hover:shadow-lg hover:bg-white hover:border-primary/10">
                              <button 
                                onClick={() => {
                                  const newWishes = [...data.config.specialWishes.wishes];
                                  newWishes.splice(i, 1);
                                  handleUpdate("config.specialWishes.wishes", newWishes);
                                }}
                                className="absolute -right-2 -top-2 w-8 h-8 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-lg border border-rose-100 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-black text-slate-400 pl-1">Wish Title</label>
                                  <input 
                                    placeholder="Enter wish title..." 
                                    value={wish.title} 
                                    onChange={(e) => {
                                      const newW = [...data.config.specialWishes.wishes];
                                      newW[i].title = e.target.value;
                                      handleUpdate("config.specialWishes.wishes", newW);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-black text-slate-400 pl-1">Description</label>
                                  <textarea 
                                    placeholder="Enter wish description..." 
                                    value={wish.description} 
                                    onChange={(e) => {
                                      const newW = [...data.config.specialWishes.wishes];
                                      newW[i].description = e.target.value;
                                      handleUpdate("config.specialWishes.wishes", newW);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-xl px-4 py-3 text-xs outline-none min-h-[80px] font-medium leading-relaxed"
                                  />
                                </div>

                                <div className="pt-2">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1 mb-2">Wish Visual</label>
                                  <div className="flex items-center gap-4">
                                    {wish.img && (
                                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0">
                                        <img src={wish.img} className="w-full h-full object-cover" alt="Wish" />
                                      </div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                      <input 
                                        type="text"
                                        value={wish.img.startsWith('data:') ? "" : wish.img}
                                        onChange={(e) => {
                                          const newFiles = { ...specialWishesImageFiles };
                                          delete newFiles[i];
                                          setSpecialWishesImageFiles(newFiles);
                                          const newWishes = [...data.config.specialWishes.wishes];
                                          newWishes[i].img = e.target.value;
                                          handleUpdate("config.specialWishes.wishes", newWishes);
                                        }}
                                        className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2 text-[10px] outline-none"
                                        placeholder="Paste URL..."
                                      />
                                      <label className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all font-black text-primary text-[10px] uppercase tracking-widest">
                                        <Upload size={14} className={uploadingStates[`wish_${i}`] && "animate-spin"} />
                                        {uploadingStates[`wish_${i}`] ? "..." : "UPLOAD"}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSpecialWishImageUpload(i, e)} />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'playlist' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Music size={18} className="text-primary" /> Romantic Playlist
                        </h3>
                        <button 
                          onClick={() => {
                            const newSongs = [...data.config.playlist.songs];
                            newSongs.push({ title: "New Song", artist: "Artist Name", url: "" });
                            handleUpdate("config.playlist.songs", newSongs);
                          }}
                          className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                          <Plus size={14} /> Add Song
                        </button>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                          <div className="space-y-4">
                            <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Playlist Theme</label>
                            <input 
                              type="text"
                              value={data.config.playlist.name}
                              onChange={(e) => handleUpdate("config.playlist.name", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                              placeholder="Playlist Name"
                            />
                            <textarea 
                              value={data.config.playlist.description}
                              onChange={(e) => handleUpdate("config.playlist.description", e.target.value)}
                              className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[100px] font-medium leading-relaxed resize-none shadow-sm"
                              placeholder="Describe this playlist..."
                            />
                          </div>

                          <div className="space-y-4">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center">Playlist Cover</label>
                            <div className="p-5 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-4 max-w-sm mx-auto group/cover">
                              <div 
                                className="aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl cursor-zoom-in bg-white relative"
                                onClick={() => setPreviewImage(data.config.playlist.coverImage)}
                              >
                                <img 
                                  src={data.config.playlist.coverImage} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/cover:scale-110"
                                  alt="Cover"
                                />
                              </div>
                              <div className="space-y-3">
                                <input 
                                  type="text"
                                  value={data.config.playlist.coverImage.startsWith('data:') ? "" : data.config.playlist.coverImage}
                                  onChange={(e) => {
                                    setPlaylistCoverFile(null);
                                    handleUpdate("config.playlist.coverImage", e.target.value);
                                  }}
                                  className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2.5 text-[10px] outline-none"
                                  placeholder="Cover URL..."
                                />
                                <label className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm font-black text-primary text-[10px] tracking-widest">
                                  <Upload size={14} className={uploadingStates.playlist_cover && "animate-spin"} />
                                  {uploadingStates.playlist_cover ? "..." : "UPLOAD COVER"}
                                  <input type="file" className="hidden" accept="image/*" onChange={handlePlaylistCoverUpload} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-slate-100">
                          <label className="text-[11px] font-black text-slate-500 block uppercase tracking-widest pl-1">Songs List</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.config.playlist.songs.map((song, i) => (
                              <div key={i} className="p-6 bg-slate-50/50 rounded-[28px] border border-slate-100 space-y-4 relative group hover:bg-white hover:shadow-lg transition-all hover:border-primary/10">
                                <button onClick={() => {
                                  const newSongs = [...data.config.playlist.songs];
                                  newSongs.splice(i, 1);
                                  handleUpdate("config.playlist.songs", newSongs);
                                }} className="absolute -right-2 -top-2 w-8 h-8 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-lg border border-rose-100 opacity-0 group-hover:opacity-100 transition-all z-10">
                                  <Trash2 size={16} />
                                </button>

                                <div className="flex gap-4">
                                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 font-black">
                                    {i + 1}
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <div className="grid grid-cols-1 gap-2">
                                      <input 
                                        value={song.title} 
                                        onChange={(e) => {
                                          const newS = [...data.config.playlist.songs];
                                          newS[i].title = e.target.value;
                                          handleUpdate("config.playlist.songs", newS);
                                        }}
                                        className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2 text-[13px] font-black outline-none"
                                        placeholder="Song Title"
                                      />
                                      <input 
                                        value={song.artist} 
                                        onChange={(e) => {
                                          const newS = [...data.config.playlist.songs];
                                          newS[i].artist = e.target.value;
                                          handleUpdate("config.playlist.songs", newS);
                                        }}
                                        className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2 text-[11px] font-medium text-slate-500 outline-none"
                                        placeholder="Artist Name"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <input 
                                        value={song.url.startsWith('data:') ? "" : song.url}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          const newS = [...data.config.playlist.songs];
                                          newS[i].url = val;
                                          handleUpdate("config.playlist.songs", newS);
                                        }}
                                        className="w-full bg-white border border-slate-200/50 rounded-xl px-3 py-2 text-[10px] outline-none"
                                        placeholder="Audio Source URL"
                                      />
                                      <label className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all font-black text-primary text-[10px] tracking-widest shadow-sm">
                                        <Upload size={14} className={uploadingStates[`song_${i}`] && "animate-spin"} />
                                        {uploadingStates[`song_${i}`] ? "..." : "UPLOAD MP3"}
                                        <input type="file" className="hidden" accept="audio/mpeg" onChange={(e) => handleSongFileUpload(i, e)} />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                  {STEPS[currentStep].id === 'finalWish' && (
                    <section className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                          <Heart size={18} className="text-primary" /> Final Wish
                        </h3>
                      </div>

                      <div className="px-6 py-8 md:px-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Title 1 (Left)</label>
                            <input 
                              type="text"
                              value={data.config.finalWish.title1}
                              onChange={(e) => handleUpdate("config.finalWish.title1", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Title 2 (Right)</label>
                            <input 
                              type="text"
                              value={data.config.finalWish.title2}
                              onChange={(e) => handleUpdate("config.finalWish.title2", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-bold outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Main Message</label>
                          <textarea 
                            value={data.config.finalWish.mainMessage}
                            onChange={(e) => handleUpdate("config.finalWish.mainMessage", e.target.value)}
                            className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm outline-none min-h-[120px] font-medium resize-none shadow-sm"
                          />
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-100">
                          <div className="flex justify-between items-center px-1">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Vows & Daily Reminders</label>
                            <button 
                              onClick={() => {
                                const newVows = [...data.config.finalWish.vows];
                                newVows.push("");
                                handleUpdate("config.finalWish.vows", newVows);
                              }}
                              className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                              <Plus size={14} /> Add Vow
                            </button>
                          </div>
                          <div className="space-y-4">
                            {data.config.finalWish.vows.map((vow, i) => (
                              <div key={i} className="flex gap-4 group">
                                <div className="flex-1 relative">
                                  <textarea 
                                    value={vow}
                                    onChange={(e) => {
                                      const newVows = [...data.config.finalWish.vows];
                                      newVows[i] = e.target.value;
                                      handleUpdate("config.finalWish.vows", newVows);
                                    }}
                                    className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-medium outline-none min-h-[80px] shadow-sm italic"
                                    placeholder={`Write vow #${i + 1}...`}
                                  />
                                </div>
                                <button 
                                  onClick={() => {
                                    const newVows = [...data.config.finalWish.vows];
                                    newVows.splice(i, 1);
                                    handleUpdate("config.finalWish.vows", newVows);
                                  }}
                                  className="self-center p-3 text-rose-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 space-y-6">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Signed By Label</label>
                            <input 
                              type="text"
                              value={data.config.finalWish.signedByLabel}
                              onChange={(e) => handleUpdate("config.finalWish.signedByLabel", e.target.value)}
                              className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-medium outline-none"
                              placeholder="Endlessly yours,"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Name 1</label>
                              <input 
                                type="text"
                                value={data.config.finalWish.name1}
                                onChange={(e) => handleUpdate("config.finalWish.name1", e.target.value)}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-black text-slate-500 mb-3 block uppercase tracking-widest pl-1">Name 2</label>
                              <input 
                                type="text"
                                value={data.config.finalWish.name2}
                                onChange={(e) => handleUpdate("config.finalWish.name2", e.target.value)}
                                className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-sm font-black outline-none shadow-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <NavigationButtons />
                      </div>
                    </section>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
          } />
        </Routes>

      {/* Status Notifications */}
      <AnimatePresence>
        {submitStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={cn(
              "fixed bottom-10 left-1/2 z-[200] px-6 md:px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 border w-[90%] sm:w-auto transition-all duration-300",
              submitStatus === "success" ? "bg-emerald-500 border-emerald-400 text-white" : "bg-primary border-primary/50 text-white"
            )}
          >
            {submitStatus === "success" ? <Check size={20} strokeWidth={3} /> : <Trash2 size={20} />}
            <span className="font-black uppercase tracking-widest text-sm">
              {submitStatus === "success" ? "SUCCESSFULLY SAVED TO SHEETS" : errorMessage || "ERROR SAVING"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex justify-center"
            >
              <img
                src={previewImage}
                alt="Full Preview"
                className="max-w-full max-h-[90vh] rounded-2xl shadow-stone-900/50 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </BrowserRouter>
  );
}
