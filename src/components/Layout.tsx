import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, MapPin, Video, Calendar, Settings, Languages, Heart, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import logoImage from '../assets/images/regenerated_image_1787252044935.png';
import bgImage from '../assets/images/regenerated_image_1787252044935.png';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { language, setLanguage, t } = useAppContext();
  
  const isSetup = location.pathname.startsWith('/admin');

  if (isSetup) {
    return <div className="min-h-screen bg-immersive-gradient text-white font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0502] text-white flex flex-col relative font-sans pb-20 md:pb-0">
      {/* Full-Screen Background Image (For Starting/Home page) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Background Image - user must upload their image to public/bg.png or use this fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        
        {/* Immersive Gradients over the image to keep text readable */}
        <div className="absolute inset-0 bg-immersive-gradient opacity-90"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/20 blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-maroon-900/40 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sticky top-0 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full saffron-bg flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(242,125,38,0.5)] group-hover:scale-105 transition-transform">
              <img src={logoImage} alt="Sri Ganga Ghanapathi logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-serif font-bold tracking-wide gold-text glow-text uppercase">
                {t('appTitle')}
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-white">{t('appSubtitle')}</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-white/10 transition-colors uppercase tracking-wider gold-text border border-[#D4AF37]/30"
              title="Toggle Language (English / Telugu)"
            >
              <Languages size={14} />
              {language === 'en' ? 'తెలుగు' : 'EN'}
            </button>
            <Link to="/donate" className="glass px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white/10 transition-colors hidden sm:block">
              {t('donate')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col w-full max-w-7xl mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="hidden md:block relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-serif gold-text font-bold mb-3 text-sm uppercase tracking-wider">Sri Ganga Ghanapathi</h3>
              <p className="text-white/50 text-xs leading-relaxed">Celebrating Ganesh Chavithi 2026 with devotion, community, and joy in Allagadda, Andhra Pradesh.</p>
            </div>
            <div>
              <h3 className="font-bold text-white/70 mb-3 text-xs uppercase tracking-wider">Quick Links</h3>
              <div className="space-y-2">
                {[['/', 'Home'], ['/schedule', 'Pooja Schedule'], ['/gallery', 'Gallery'], ['/donate', 'Donate'], ['/volunteer', 'Volunteer'], ['/committee', 'Committee & Volunteers']].map(([to, label]) => (
                  <Link key={to} to={to} className="block text-xs text-white/50 hover:text-[#D4AF37] transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white/70 mb-3 text-xs uppercase tracking-wider">Contact</h3>
              <div className="space-y-2">
                <a href="tel:+918970584121" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"><Phone size={12} /> +91 89705 84121</a>
                <a href="mailto:info@ganeshchavithi2026.in" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"><Mail size={12} /> info@ganeshchavithi2026.in</a>
                <p className="flex items-center gap-2 text-xs text-white/50"><MapPin size={12} /> Adranam Street, Allagadda, AP 518543</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <p className="text-[10px] text-white/30 uppercase tracking-widest">© 2026 Sri Ganga Ghanapathi Committee · Allagadda</p>
            <p className="text-[10px] text-white/30 flex items-center gap-1">Made with <Heart size={10} className="text-red-400" /> for the community</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-t border-white/10 safe-area-pb">
        <div className="flex justify-around items-center p-2">
          <NavItem to="/" icon={<Home size={20} />} label={t('home')} />
          <NavItem to="/schedule" icon={<Calendar size={20} />} label={t('pooja')} />
          <NavItem to="/live" icon={<Video size={20} />} label={t('live')} />
          <NavItem to="/gallery" icon={<Image size={20} />} label={t('gallery')} />
          <NavItem to="/menu" icon={<Settings size={20} />} label={t('more')} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link to={to} className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${isActive ? 'gold-text' : 'text-white/50 hover:text-white'}`}>
      <div className={`p-1.5 rounded-full ${isActive ? 'glass mb-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0'}`}>
        {label}
      </span>
    </Link>
  );
}
