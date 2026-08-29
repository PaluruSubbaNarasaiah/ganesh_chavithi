import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, Video, Image, Heart, Trophy, Megaphone, Users, Phone, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';
import heroImage from '../assets/images/regenerated_image_1787252044935.png';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: 'easeOut',
      staggerChildren: 0.2,
      delayChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: [0, -10, 0],
    transition: {
      scale: { duration: 0.5 },
      opacity: { duration: 0.5 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
    }
  }
};

export default function Home() {
  const { announcements, t } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const yDecor = useTransform(scrollY, [0, 800], [0, -150]);
  
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Hero Section */}
      <motion.section 
        id="immersive-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setExpanded(!expanded)}
        className="relative pt-16 pb-12 overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(242,125,38,0.15)] bg-[#0a0502] cursor-pointer group"
      >
        {/* Main Background Image */}
        <motion.div 
          className="absolute -top-[20%] -bottom-[20%] -left-[10%] -right-[10%] z-0 opacity-40"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: yBg
          }}
        ></motion.div>

        {/* Decorative Traditional Mandala Pattern Overlay */}
        <motion.div 
          className="absolute -top-[20%] -bottom-[20%] -left-[10%] -right-[10%] z-0 opacity-10 mix-blend-color-dodge"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1605722243979-fe0be8158222?auto=format&fit=crop&q=80&w=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: yBg
          }}
        ></motion.div>

        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0502] backdrop-blur-sm"></div>

        {/* Decorative Parallax Elements */}
        <motion.div 
          style={{ y: yDecor }}
          className="absolute top-10 left-[10%] z-0 text-[#F27D26]/20"
        >
          <Sparkles size={40} />
        </motion.div>
        <motion.div 
          style={{ y: yDecor }}
          className="absolute bottom-20 right-[10%] z-0 text-[#F27D26]/20"
        >
          <Sparkles size={24} />
        </motion.div>

        {/* Hover Tooltip */}
        <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-black/60 border border-[#F27D26]/30 text-[10px] font-bold uppercase tracking-widest text-[#F27D26] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-md shadow-[0_0_20px_rgba(242,125,38,0.2)]">
          {expanded ? 'Collapse Details' : 'Click to Discover'}
        </div>

        <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-6 px-4">
          <motion.div 
            variants={imageVariants}
            className="w-40 h-40 rounded-full p-[2px] bg-gradient-to-b from-[#F27D26] to-[#F27D26]/20 shadow-[0_0_30px_rgba(242,125,38,0.3)] relative group"
          >
            <div className="w-full h-full rounded-full bg-[#110804] flex items-center justify-center overflow-hidden relative">
              <img 
                src={heroImage} 
                alt="Lord Ganesha" 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1566411516084-7a329dce6bb5?auto=format&fit=crop&q=80&w=256";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
          
          <div className="space-y-2 mt-4">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-serif font-bold gold-text glow-text uppercase tracking-wider"
            >
              {t('appSubtitle')}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-[0.25em] text-white/70"
            >
              {t('committeeName')}
            </motion.p>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden text-sm text-white/80 max-w-lg leading-relaxed border-t border-white/10 pt-4"
              >
                Welcome to our digital pandal! For decades, our committee has strived to bring the community together through devotion, culture, and joyous celebration. Explore our rich traditions, participate in cultural competitions, and join us in seeking the eternal blessings of Lord Ganesha.
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div variants={itemVariants}>
            <motion.div 
              animate={{ y: expanded ? 0 : [0, 5, 0] }}
              transition={{ duration: 2, repeat: expanded ? 0 : Infinity }}
              className="text-white/40 mt-2 hover:text-[#F27D26] transition-colors"
            >
              {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Announcements Marquee */}
      <div className="glass rounded-xl overflow-hidden py-3 px-4 flex items-center gap-3">
        <Megaphone className="saffron-text shrink-0" size={18} />
        <div className="relative flex-1 overflow-hidden h-5">
          <motion.div 
            animate={{ y: [0, -20, -40, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full flex flex-col gap-5 text-[10px] uppercase tracking-widest text-white/80"
          >
            {announcements.map((ann: string, i: number) => <span key={i} className="truncate">{ann}</span>)}
            <span className="truncate">{announcements[0]}</span>
          </motion.div>
        </div>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MenuButton to="/schedule" icon={<Calendar className="gold-text" size={24} />} title={t('poojaTimings')} />
        <MenuButton to="/live" icon={<Video className="text-red-500" size={24} />} title={t('liveStream')} pulse={true} />
        <MenuButton to="/donate" icon={<Heart className="saffron-text" size={24} />} title={t('donate')} />
        <MenuButton to="/gallery" icon={<Image className="text-emerald-400" size={24} />} title={t('gallery')} />
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <ListMenuButton to="/stories" icon={<BookOpen className="gold-text" />} title={t('ganeshStories')} subtitle={t('ganeshStoriesSub')} />
        <ListMenuButton to="/location" icon={<MapPin className="gold-text" />} title={t('locationMap')} subtitle={t('locationMapSub')} />
        <ListMenuButton to="/competitions" icon={<Trophy className="gold-text" />} title={t('competitions')} subtitle={t('competitionsSub')} />
        <ListMenuButton to="/committee" icon={<Users className="gold-text" />} title={t('committeeMembers')} subtitle={t('committeeMembersSub')} />
        <ListMenuButton to="/volunteer" icon={<Users className="gold-text" />} title={t('volunteer')} subtitle={t('volunteerSub')} />
      </div>

      {/* Sponsors Section - managed via admin */}
    </div>
  );
}

function MenuButton({ to, icon, title, pulse }: { to: string; icon: ReactNode; title: string; pulse?: boolean }) {
  return (
    <Link to={to} className="block group">
      <motion.div
        animate={pulse ? { scale: [1, 1.03, 1] } : {}}
        transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        className="h-full"
      >
        <Card className={`flex flex-col items-center justify-center text-center gap-3 h-32 ${pulse ? 'border-red-500/30 bg-red-900/10' : ''}`}>
          <motion.div 
            animate={pulse ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            className={`p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border ${pulse ? 'border-red-500/30' : 'border-white/5'}`}
          >
            {icon}
          </motion.div>
          <span className="font-bold text-xs uppercase tracking-wider gold-text">{title}</span>
        </Card>
      </motion.div>
    </Link>
  );
}

function ListMenuButton({ to, icon, title, subtitle }: { to: string; icon: ReactNode; title: string; subtitle: string }) {
  return (
    <Link to={to} className="block">
      <Card className="flex items-center gap-4 py-4 px-5">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          {icon}
        </div>
        <div>
          <h3 className="font-bold gold-text">{title}</h3>
          <p className="text-[10px] opacity-60 uppercase tracking-tighter mt-1">{subtitle}</p>
        </div>
      </Card>
    </Link>
  );
}
