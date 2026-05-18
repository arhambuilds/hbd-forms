import { Link } from 'react-router-dom';
import { Heart, Instagram, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black uppercase tracking-tighter text-slate-900 italic">TITLLI BY ARHAM</span>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
              Crafting premium digital experiences for your most cherished moments. Celebrate love, milestones, and memories with buttery-smooth animations.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="mailto:bussiness@arhamadib.in" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
                <Mail size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Form Editor</Link></li>
              <li><Link to="/tutorial" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">How it works</Link></li>
              <li><Link to="/store" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Store</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/faq" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            © {currentYear} Arham builds. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Made with <Heart size={10} className="text-primary fill-primary mx-1" /> for special souls
          </div>
        </div>
      </div>
    </footer>
  );
}
