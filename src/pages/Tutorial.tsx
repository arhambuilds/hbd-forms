import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Rocket, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Heart,
  Sparkles,
  ArrowLeft,
  Mail,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageDecoration = () => {
  const hearts = [
    { size: 44, top: '12%', left: '10%', right: 'auto', delay: '0s' },
    { size: 32, top: '55%', left: '8%', right: 'auto', delay: '1s' },
    { size: 38, top: '30%', left: 'auto', right: '5%', delay: '2s' },
  ];

  const sparkles = [
    { size: 38, top: '25%', left: 'auto', right: '12%', delay: '0.5s' },
    { size: 28, top: '65%', left: 'auto', right: '15%', delay: '1.5s' },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none opacity-20">
      {hearts.map((h, i) => (
        <motion.div 
          key={`heart-${i}`}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
          className="absolute hidden lg:block text-primary/30"
          style={{ top: h.top, left: h.left || 'auto', right: h.right || 'auto' }}
        >
          <Heart size={h.size} fill="currentColor" className="opacity-20" />
        </motion.div>
      ))}
      {sparkles.map((s, i) => (
        <motion.div 
          key={`sparkle-${i}`}
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className="absolute hidden lg:block text-primary/30"
          style={{ top: s.top, right: s.right || 'auto', left: s.left || 'auto' }}
        >
          <Sparkles size={s.size} className="opacity-20" />
        </motion.div>
      ))}
    </div>
  );
};

const TutorialBox = ({ icon, label, description, delay }: { icon: React.ReactNode; label: string; description: string; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group p-6 bg-white rounded-3xl border border-primary/5 flex flex-col items-start gap-4 transition-all duration-500 hover:shadow-xl shadow-sm"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110 shadow-inner">
      {icon}
    </div>
    <div className="space-y-1 text-left">
      <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-tight">{label}</p>
      <p className="text-[12px] font-medium text-slate-500 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TutorialStep = ({ number, title, text, delay }: { number: string; title: string; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className="flex gap-4 relative group"
  >
    <div className="flex flex-col items-center shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="w-0.5 flex-grow bg-slate-100 my-2 rounded-full"></div>
    </div>
    <div className="pb-8 pt-0.5">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1.5">{title}</h3>
      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

export default function Tutorial() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
            setIsPaused(false);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPaused(true);
          }
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-28 md:pt-40 pb-20 relative overflow-hidden">
        <PageDecoration />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={sectionRef}>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px] group mb-8"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Content Column */}
            <div className={`w-full lg:w-1/2 space-y-10 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-x-6 opacity-0'}`}>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase">
                  How it <span className="text-primary italic font-serif lowercase">works.</span>
                </h2>
                <div className="h-2 w-20 bg-primary rounded-full"></div>
              </div>

              <div className="space-y-2">
                <TutorialStep 
                  number="01" 
                  title="Make Payment" 
                  text="Choose your template and complete the payment process securely on our store." 
                  delay={1}
                />
                <TutorialStep 
                  number="02" 
                  title="Fill the Form" 
                  text="Fill out the celebration form with your personal details, memories, and photos." 
                  delay={2}
                />
                <TutorialStep 
                  number="03" 
                  title="Wait for Magic" 
                  text="Our team will process your data and craft your personalized digital experience." 
                  delay={3}
                />
                <TutorialStep 
                  number="04" 
                  title="Receive & Share" 
                  text="Get your unique link via DM or Email and surprise your special someone!" 
                  delay={4}
                />
              </div>


            </div>

            {/* Visual Column */}
            <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-700 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
              {/* Video Section */}
              <div className="relative group">
                <div 
                  className="aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-slate-900 cursor-pointer group/video"
                  onClick={togglePlay}
                >
                  <video 
                    ref={videoRef}
                    src="https://files.catbox.moe/t0l7ir.mp4" 
                    className="w-full h-full object-cover brightness-[0.9] group-hover/video:brightness-100 transition-all duration-700" 
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <button 
                        onClick={toggleMute}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                        {isPaused ? <Play size={16} fill="white" className="ml-1" /> : <Pause size={16} fill="white" />}
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Watch Guide Video</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isPaused && (
                      <motion.div 
                        key="play-overlay"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                      >
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                          <Play size={24} className="text-white fill-white ml-1.5" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 4 Box Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <TutorialBox 
                  icon={<Mail className="w-5 h-5" />} 
                  label="Verification" 
                  description="Email and PDF receipt are mandatory for verification for your order." 
                  delay={0}
                />
                <TutorialBox 
                  icon={<Clock className="w-5 h-5" />} 
                  label="Delivery" 
                  description="The delivery timer starts after form submission automatically." 
                  delay={2}
                />
                <TutorialBox 
                  icon={<ImageIcon className="w-5 h-5" />} 
                  label="Visuals" 
                  description="We recommend to do not change our images; it is perfect for the occasion." 
                  delay={4}
                />
                <TutorialBox 
                  icon={<ShieldCheck className="w-5 h-5" />} 
                  label="Privacy" 
                  description="Your data is kept safely; after two months of validity period, your data is automatically deleted." 
                  delay={6}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
