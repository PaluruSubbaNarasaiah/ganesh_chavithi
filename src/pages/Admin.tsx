import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui';
import { Users, QrCode, Heart, Trophy, Settings, LogOut, Plus, Trash2, Megaphone, Calendar, Image as ImageIcon, BookOpen, Video, LayoutDashboard, Edit2, X, Check, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import heroImage from '../assets/images/regenerated_image_1787252044935.png';
import logoImage from '../assets/images/regenerated_image_1787252044935.png';

const tabContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function Admin() {
  const { authSession } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authSession));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => setIsLoggedIn(Boolean(authSession)), [authSession]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0502]">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div 
          className="absolute inset-0 z-0 opacity-5 mix-blend-color-dodge"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1605722243979-fe0be8158222?auto=format&fit=crop&q=80&w=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0502] backdrop-blur-sm"></div>
        <motion.div initial="hidden" animate="visible" variants={itemVariants} className="w-full max-w-sm relative z-10">
          <Card className="p-8 glass">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Settings className="gold-text" size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold gold-text">Admin Login</h2>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-2">Committee Members Only</p>
          </div>
          
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              setLoginError('');
              const { supabase } = await import('../lib/supabase');
              if (!supabase) {
                setLoginError('Supabase is not configured.');
                return;
              }
              const { error } = await supabase.auth.signInWithPassword({ email, password });
              if (error) setLoginError(error.message);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Your Supabase password" />
            </div>
            {loginError && <p className="text-red-300 text-xs text-center">{loginError}</p>}
            <button type="submit" className="w-full py-3 rounded-xl saffron-bg text-white font-bold hover:shadow-[0_0_20px_rgba(242,125,38,0.4)] transition-shadow uppercase tracking-wider text-sm">
              Access Dashboard
            </button>
          </form>
        </Card>
        </motion.div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab setActiveTab={setActiveTab} />;
      case 'announcements': return <AnnouncementsTab />;
      case 'gallery': return <GalleryTab />;
      case 'stories': return <StoriesTab />;
      case 'schedule': return <ScheduleTab />;
      case 'live': return <LiveTab />;
      case 'volunteers': return <VolunteersTab />;
      case 'donations': return <DonationsTab />;
      case 'committee': return <CommitteeTab />;
      case 'settings': return <SettingsTab />;
      default: return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0502] pb-20 font-sans relative overflow-hidden">
        <div 
          className="fixed inset-0 z-0 opacity-10"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div 
          className="fixed inset-0 z-0 opacity-5 mix-blend-color-dodge"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1605722243979-fe0be8158222?auto=format&fit=crop&q=80&w=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/90 via-black/80 to-[#0a0502] backdrop-blur-sm"></div>

      <header className="bg-black/40 border-b border-white/10 p-4 sticky top-0 z-20 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg gold-text font-serif">Committee Admin</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Ganesh Chavithi 2026</p>
          </div>
          <button onClick={async () => {
            const { supabase } = await import('../lib/supabase');
            await supabase?.auth.signOut();
            setIsLoggedIn(false);
          }} className="p-2 text-white/50 hover:text-white transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 relative z-10">
        {/* Desktop Sidebar (hidden on mobile, acts as nav) */}
        <div className="hidden md:flex flex-col w-64 gap-2">
          <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavBtn active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} icon={<Megaphone size={18} />} label="Announcements" />
          <NavBtn active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar size={18} />} label="Pooja Timings" />
          <NavBtn active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon size={18} />} label="Gallery" />
          <NavBtn active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} icon={<BookOpen size={18} />} label="Stories" />
          <NavBtn active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={<Video size={18} />} label="Live Stream" />
          <NavBtn active={activeTab === 'volunteers'} onClick={() => setActiveTab('volunteers')} icon={<Users size={18} />} label="Volunteers" />
          <NavBtn active={activeTab === 'donations'} onClick={() => setActiveTab('donations')} icon={<Heart size={18} />} label="Donations" />
          <NavBtn active={activeTab === 'committee'} onClick={() => setActiveTab('committee')} icon={<Users size={18} />} label="Committee" />
          <NavBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18} />} label="Footer" />
        </div>

        {/* Mobile Nav Tabs (scrollable horizontal) */}
        <div className="md:hidden flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
           <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={16} />} label="Dash" mobile />
           <NavBtn active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} icon={<Megaphone size={16} />} label="Alerts" mobile />
           <NavBtn active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar size={16} />} label="Pooja" mobile />
           <NavBtn active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon size={16} />} label="Gallery" mobile />
           <NavBtn active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} icon={<BookOpen size={16} />} label="Stories" mobile />
           <NavBtn active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={<Video size={16} />} label="Live" mobile />
           <NavBtn active={activeTab === 'volunteers'} onClick={() => setActiveTab('volunteers')} icon={<Users size={16} />} label="Vols" mobile />
           <NavBtn active={activeTab === 'donations'} onClick={() => setActiveTab('donations')} icon={<Heart size={16} />} label="Donations" mobile />
           <NavBtn active={activeTab === 'committee'} onClick={() => setActiveTab('committee')} icon={<Users size={16} />} label="Team" mobile />
           <NavBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={16} />} label="Footer" mobile />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 safe-area-pb p-4 flex justify-center">
         <Link to="/" className="text-white/60 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
           ← Return to Public Site
         </Link>
      </nav>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label, mobile }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, mobile?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors border ${active ? 'bg-white/10 border-white/20 gold-text' : 'bg-transparent border-transparent text-white/60 hover:bg-white/5'} ${mobile ? 'whitespace-nowrap flex-shrink-0' : 'w-full'}`}
    >
      {icon}
      <span className="font-bold text-xs uppercase tracking-wider">{label}</span>
    </button>
  );
}

// --- TAB COMPONENTS ---

const donationData = [
  { day: 'Day 1', amount: 4500 },
  { day: 'Day 2', amount: 6200 },
  { day: 'Day 3', amount: 5100 },
  { day: 'Day 4', amount: 8400 },
  { day: 'Day 5', amount: 9600 },
  { day: 'Day 6', amount: 11400 },
];

function DashboardTab({ setActiveTab }: { setActiveTab: (t: string) => void }) {
  return (
    <div className="space-y-6">
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Users />} label="Visitors" value="1,245" color="text-blue-400" />
        <StatCard icon={<QrCode />} label="QR Scans" value="856" color="text-emerald-400" />
        <StatCard icon={<Heart />} label="Donations" value="₹45,200" color="text-red-400" />
        <StatCard icon={<Trophy />} label="Signups" value="124" color="text-yellow-400" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="glass !p-6 mb-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <TrendingUp className="text-red-400" size={20} />
            </div>
            <div>
              <h3 className="font-serif gold-text text-lg">Donation Trends</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Festival Days Overview</p>
            </div>
          </div>
          
          <div className="h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#ffffff50" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff50" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a0d05', border: '1px solid rgba(242,125,38,0.2)', borderRadius: '8px' }}
                  itemStyle={{ color: '#F27D26' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Donations']}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#F27D26" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Quick Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ManageCard title="Update Announcements" onClick={() => setActiveTab('announcements')} />
          <ManageCard title="Edit Pooja Schedule" onClick={() => setActiveTab('schedule')} />
          <ManageCard title="Upload to Gallery" onClick={() => setActiveTab('gallery')} />
          <ManageCard title="Manage Live Stream" onClick={() => setActiveTab('live')} />
          <ManageCard title="Manage Committee" onClick={() => setActiveTab('committee')} />
        </div>
      </motion.div>
    </div>
  );
}

function AnnouncementsTab() {
  const { announcements, setAnnouncements } = useAppContext();
  const [newAnn, setNewAnn] = useState('');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnn.trim()) {
      setAnnouncements([newAnn, ...announcements]);
      setNewAnn('');
    }
  };

  const remove = (index: number) => {
    setAnnouncements(announcements.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Add Announcement</h3>
        <form onSubmit={add} className="flex gap-2">
          <input 
            type="text" 
            value={newAnn} 
            onChange={e => setNewAnn(e.target.value)} 
            placeholder="E.g., Prasadam distribution starts in 10 mins" 
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
            required 
          />
          <button type="submit" className="px-4 py-2 saffron-bg rounded-xl text-white font-bold hover:bg-orange-500 transition-colors">
            <Plus size={20} />
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {announcements.map((ann: string, i: number) => (
          <Card key={i} className="glass !p-4 flex justify-between items-center">
            <p className="text-sm text-white/90">{ann}</p>
            <button onClick={() => remove(i)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          </Card>
        ))}
        {announcements.length === 0 && <p className="text-white/40 text-sm text-center py-4">No announcements added.</p>}
      </div>
    </div>
  );
}

function GalleryTab() {
  const { gallery, setGallery } = useAppContext();
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          setPreview(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (preview && title) {
      setGallery([{ id: Date.now(), url: preview, title }, ...gallery]);
      setPreview(null);
      setTitle('');
    }
  };

  const remove = (id: number) => {
    setGallery(gallery.filter((g: any) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Upload Photo</h3>
        <form onSubmit={add} className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              required={!preview}
            />
            {preview ? (
              <div className="flex flex-col items-center">
                <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover mb-2" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Image Selected (Click to change)</span>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <ImageIcon size={32} className="text-white/40 mb-2" />
                <span className="text-sm font-bold text-white/70">Click or drag image to upload</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">PNG, JPG, WEBP</span>
              </div>
            )}
          </div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Morning Harathi)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
          <button type="submit" disabled={!preview} className="w-full py-3 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed">Add to Gallery</button>
        </form>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {gallery.map((img: any) => (
          <div key={img.id} className="relative rounded-xl overflow-hidden aspect-square border border-white/10 group">
            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => remove(img.id)} className="p-3 bg-red-600 rounded-full text-white hover:scale-110 transition-transform">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-[10px] font-bold text-center truncate">{img.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoriesTab() {
  const { stories, setStories } = useAppContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      setStories([{ id: Date.now().toString(), title, summary: content.substring(0, 50) + '...', content }, ...stories]);
      setTitle('');
      setContent('');
    }
  };

  const remove = (id: string) => {
    setStories(stories.filter((s: any) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Add Story or Sloka</h3>
        <form onSubmit={add} className="space-y-3">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Full content..." rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
          <button type="submit" className="w-full py-2 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs">Publish</button>
        </form>
      </Card>

      <div className="space-y-3">
        {stories.map((story: any) => (
          <Card key={story.id} className="glass !p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold gold-text">{story.title}</h4>
                <p className="text-xs text-white/60 mt-1 line-clamp-2">{story.content}</p>
              </div>
              <button onClick={() => remove(story.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors shrink-0 ml-2">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ScheduleTab() {
  const { poojaTimings, setPoojaTimings } = useAppContext();
  
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [heldBy, setHeldBy] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTime, setEditTime] = useState('');
  const [editName, setEditName] = useState('');
  const [editHeldBy, setEditHeldBy] = useState('');

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (time && name && poojaTimings[dayIndex]) {
      const newTimings = [...poojaTimings];
      newTimings[dayIndex].events.push({ time, name, type: 'pooja', heldBy });
      setPoojaTimings(newTimings);
      setTime('');
      setName('');
      setHeldBy('');
    }
  };

  const deleteEvent = (dIdx: number, eIdx: number) => {
    const newTimings = [...poojaTimings];
    newTimings[dIdx].events.splice(eIdx, 1);
    setPoojaTimings(newTimings);
  };

  const startEdit = (dIdx: number, eIdx: number, ev: any) => {
    setEditingId(`${dIdx}-${eIdx}`);
    setEditTime(ev.time);
    setEditName(ev.name);
    setEditHeldBy(ev.heldBy || '');
  };

  const saveEdit = (dIdx: number, eIdx: number) => {
    const newTimings = [...poojaTimings];
    newTimings[dIdx].events[eIdx] = {
      ...newTimings[dIdx].events[eIdx],
      time: editTime,
      name: editName,
      heldBy: editHeldBy
    };
    setPoojaTimings(newTimings);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Add Pooja / Event</h3>
        <form onSubmit={addEvent} className="space-y-3">
          <div className="flex gap-2">
            <select 
              value={dayIndex} 
              onChange={e => setDayIndex(Number(e.target.value))}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {poojaTimings.map((d: any, i: number) => (
                <option key={i} value={i} className="bg-zinc-900">{d.day}</option>
              ))}
            </select>
            <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="Time (e.g. 5:00 PM)" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
          </div>
          <div className="flex gap-2">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Event Name" className="w-1/2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
            <input type="text" value={heldBy} onChange={e => setHeldBy(e.target.value)} placeholder="Held By (Sponsor) - Optional" className="w-1/2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <button type="submit" className="w-full py-2 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs">Add Event</button>
        </form>
      </Card>

      <div className="space-y-6">
        {poojaTimings.map((day: any, i: number) => (
          <div key={i}>
            <h4 className="font-bold gold-text mb-3">{day.day} - {day.date}</h4>
            <div className="space-y-2">
              {day.events.map((ev: any, j: number) => {
                const isEditing = editingId === `${i}-${j}`;
                return (
                  <div key={j} className="glass p-3 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-white/5 gap-3">
                    {isEditing ? (
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <input type="text" value={editTime} onChange={e => setEditTime(e.target.value)} className="w-1/3 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white" placeholder="Time" />
                          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white" placeholder="Name" />
                        </div>
                        <input type="text" value={editHeldBy} onChange={e => setEditHeldBy(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white" placeholder="Held By" />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <span className="font-bold text-white/90 block">{ev.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white/50 text-xs">{ev.time}</span>
                          {ev.heldBy && (
                            <>
                              <span className="text-white/20 text-[10px]">•</span>
                              <span className="text-[10px] uppercase tracking-wider text-gold-text">Held By: {ev.heldBy}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 justify-end">
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdit(i, j)} className="p-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 rounded-lg transition-colors">
                            <Check size={16} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(i, j, ev)} className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteEvent(i, j)} className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {day.events.length === 0 && <p className="text-white/30 text-xs italic">No events scheduled.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveTab() {
  const { liveEvent, setLiveEvent } = useAppContext();
  
  const [isLive, setIsLive] = useState(liveEvent.isLive);
  const [title, setTitle] = useState(liveEvent.title);
  const [desc, setDesc] = useState(liveEvent.description);
  const [url, setUrl] = useState(liveEvent.url);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setLiveEvent({ ...liveEvent, isLive, title, description: desc, url });
    alert('Live stream settings updated!');
  };

  return (
    <Card className="glass !p-6">
      <h3 className="font-serif gold-text text-xl mb-4">Manage Live Stream</h3>
      <form onSubmit={save} className="space-y-4">
        <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer">
          <input type="checkbox" checked={isLive} onChange={e => setIsLive(e.target.checked)} className="w-5 h-5 accent-[#F27D26]" />
          <div>
            <span className="font-bold block">Currently Live</span>
            <span className="text-[10px] text-white/50 uppercase">Show "LIVE" badge to visitors</span>
          </div>
        </label>
        
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Stream Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
        </div>
        
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Description / Upcoming Info</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Video Thumbnail/Embed URL</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" required />
        </div>

        <button type="submit" className="w-full py-3 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(242,125,38,0.3)] mt-2">
          Save Settings
        </button>
      </form>
    </Card>
  );
}

function VolunteersTab() {
  const { volunteers, setVolunteers } = useAppContext();

  const updateStatus = (id: string, status: string) => {
    setVolunteers(volunteers.map((v: any) => v.id === id ? { ...v, status } : v));
  };

  const remove = (id: string) => {
    if(window.confirm('Are you sure you want to remove this volunteer?')) {
      setVolunteers(volunteers.filter((v: any) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif gold-text text-xl">Manage Volunteers</h3>
          <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/30">
            {volunteers.length} Total
          </span>
        </div>

        <div className="space-y-3">
          {volunteers.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8 italic border border-dashed border-white/10 rounded-xl">No volunteer applications yet.</p>
          ) : (
            volunteers.map((vol: any) => (
              <div key={vol.id} className="glass p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-white/5 relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  vol.status === 'approved' ? 'bg-emerald-500' : 
                  vol.status === 'rejected' ? 'bg-red-500' : 
                  'bg-yellow-500'
                }`}></div>
                
                <div className="pl-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white/90">{vol.name}</h4>
                    <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      vol.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                      vol.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {vol.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Megaphone size={12}/> {vol.role}</span>
                    <span>•</span>
                    <a href={`tel:${vol.phone}`} className="hover:text-emerald-400 transition-colors">{vol.phone}</a>
                    <span>•</span>
                    <span>{new Date(vol.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto pl-3 sm:pl-0">
                  {vol.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(vol.id, 'approved')} className="p-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 rounded-lg transition-colors tooltip-trigger" title="Approve">
                        <Check size={16} />
                      </button>
                      <button onClick={() => updateStatus(vol.id, 'rejected')} className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-colors" title="Reject">
                        <X size={16} />
                      </button>
                    </>
                  )}
                  <button onClick={() => remove(vol.id)} className="p-2 bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

const generateInvoiceNumber = (donation: any) => {
  const date = donation?.date ? new Date(donation.date) : new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GCV-${stamp}-${random}`;
};

const generateInvoiceMessage = (donation: any) => {
  const invoiceNumber = donation?.invoiceNumber || generateInvoiceNumber(donation);
  const amount = formatCurrency(donation?.amount || 0);
  const donorMobile = donation?.mobile || donation?.phone || 'Not provided';
  const donationDate = donation?.date ? new Date(donation.date).toLocaleDateString('en-IN') : 'Today';

  return [
    '🙏 Thank you for your generous donation to Sri Ganga Ghanapathi - Ganesh Chavithi 2026.',
    '',
    `Invoice No: ${invoiceNumber}`,
    `Donor Name: ${donation?.name || 'Guest'}`,
    `Mobile: ${donorMobile}`,
    `Amount: ${amount}`,
    `Date: ${donationDate}`,
    'Status: Approved',
    '',
    'Your contribution will help us celebrate the festival with devotion and service.'
  ].join('\n');
};

const sendDonationInvoiceToWhatsApp = (donation: any) => {
  const donorMobile = (donation?.mobile || donation?.phone || '').toString().trim();
  if (!donorMobile) return;

  const cleanMobile = donorMobile.replace(/\D/g, '');
  if (!cleanMobile) return;

  const message = encodeURIComponent(generateInvoiceMessage(donation));
  window.open(`https://wa.me/${cleanMobile}?text=${message}`, '_blank', 'noopener,noreferrer');
};

const formatInvoiceAmount = (value: number | string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value || 0));

const generateUpiLink = (upiId: string, amount: number, donorName: string) =>
  `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(donorName)}&am=${amount.toFixed(2)}&cu=INR`;

const drawInvoiceSeal = (doc: jsPDF, x: number, y: number) => {
  doc.setDrawColor(15, 15, 15);
  doc.setLineWidth(1.1);
  doc.circle(x, y, 30, 'S');
  doc.circle(x, y, 23, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 15, 15);
  doc.setFontSize(7);

  const sealText = 'Sri Ganga Ghanapathi';
  const radius = 26;
  for (let i = 0; i < sealText.length; i++) {
    const angle = ((-Math.PI / 2) + (i / sealText.length) * Math.PI * 1.8);
    const tx = x + Math.cos(angle) * radius;
    const ty = y + Math.sin(angle) * radius;
    doc.text(sealText[i], tx, ty, { angle: i > 0 ? 360 - ((i / sealText.length) * 180) : 0, align: 'center' });
  }

  doc.setFontSize(9);
  doc.text('G', x, y + 4, { align: 'center' });
  doc.setLineWidth(0.8);
  doc.moveTo(x - 12, y + 16);
  doc.lineTo(x + 12, y + 16);
  doc.stroke();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('Allagadda', x, y + 23, { align: 'center' });
};

const drawInvoiceSignature = (doc: jsPDF, x: number, y: number) => {
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(1.1);
  doc.setFont('times', 'italic');
  doc.setFontSize(28);
  doc.text('P. S. Narasaiah', x, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Signature', x + 20, y + 18);
};

const downloadDonationInvoice = async (donation: any) => {
  const invoiceNumber = donation?.invoiceNumber || generateInvoiceNumber(donation);
  const donorName = donation?.name || 'Guest';
  const donorMobile = donation?.mobile || donation?.phone || 'Not provided';
  const donorAddress = donation?.address || 'Adranam Street, ALLAGADDA\nAndhra Pradesh - 518543';
  const amount = Number(donation?.amount || 0);
  const invoiceDate = donation?.date ? new Date(donation.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  const upiId = donation?.upiId || 'ganeshchavithi@upi';

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const borderX = 18;
  const borderY = 18;
  const innerWidth = pageWidth - borderX * 2;

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(1.6);
  doc.roundedRect(borderX, borderY, innerWidth, pageHeight - borderY * 2, 16, 16, 'S');

  doc.addImage(logoImage, 'PNG', 34, 34, 84, 84);
  doc.addImage(logoImage, 'PNG', pageWidth - 118, 34, 84, 84);

  doc.setTextColor(17, 168, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Donation Receipt Invoice', pageWidth / 2, 64, { align: 'center' });

  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(1.2);
  doc.line(70, 86, pageWidth - 70, 86);

  doc.setTextColor(17, 168, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Sri Ganga Ghananathi', pageWidth / 2, 108, { align: 'center' });

  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Adranam Street, Allagadda, Andhra Pradesh, 518543', pageWidth / 2, 124, { align: 'center' });
  doc.text('Mobile Number: 8970584121', pageWidth / 2, 138, { align: 'center' });

  const leftX = 56;
  const rightX = 430;
  const detailsY = 182;

  doc.setTextColor(17, 168, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Client Name', leftX, detailsY);
  doc.text(':', leftX + 90, detailsY);
  doc.text(donorName, leftX + 105, detailsY);

  doc.text('Client Address', leftX, detailsY + 28);
  doc.text(':', leftX + 90, detailsY + 28);
  const addrLines = donorAddress.split('\n');
  addrLines.forEach((line: string, index: number) => {
    doc.text(line, leftX + 105, detailsY + 28 + index * 14);
  });

  doc.text('Mobile', leftX, detailsY + 62);
  doc.text(':', leftX + 90, detailsY + 62);
  doc.text(String(donorMobile), leftX + 105, detailsY + 62);

  doc.text('Invoice No', rightX, detailsY);
  doc.text(':', rightX + 74, detailsY);
  doc.text(invoiceNumber, rightX + 84, detailsY);

  doc.text('Invoice Date', rightX, detailsY + 28);
  doc.text(':', rightX + 74, detailsY + 28);
  doc.text(invoiceDate, rightX + 84, detailsY + 28);

  const tableX = 38;
  const tableY = 262;
  const tableWidth = pageWidth - tableX * 2;

  doc.setFillColor(17, 168, 199);
  doc.roundedRect(tableX, tableY, tableWidth, 24, 6, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('S.No', tableX + 18, tableY + 16);
  doc.text('Product', tableX + 115, tableY + 16);
  doc.text('Rate', tableX + 285, tableY + 16);
  doc.text('Qty', tableX + 345, tableY + 16);
  doc.text('Amount', tableX + 398, tableY + 16);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(tableX, tableY + 24, tableWidth, 52, 6, 6, 'F');
  doc.setDrawColor(200, 225, 231);
  doc.setLineWidth(0.7);
  doc.line(tableX, tableY + 24 + 26, tableX + tableWidth, tableY + 24 + 26);

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('1', tableX + 20, tableY + 46);
  doc.text('Donation', tableX + 116, tableY + 46);
  doc.text(formatInvoiceAmount(amount), tableX + 270, tableY + 46);
  doc.text('1', tableX + 350, tableY + 46);
  doc.text(formatInvoiceAmount(amount), tableX + 390, tableY + 46);

  const totalsBoxX = 420;
  const totalsBoxY = 338;
  const totalsBoxW = 130;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(totalsBoxX, totalsBoxY, totalsBoxW, 62, 6, 6, 'F');
  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(0.8);
  doc.line(totalsBoxX, totalsBoxY + 30, totalsBoxX + totalsBoxW, totalsBoxY + 30);
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Sub Total', totalsBoxX + 14, totalsBoxY + 20);
  doc.text(formatInvoiceAmount(amount), totalsBoxX + 80, totalsBoxY + 20);
  doc.setFillColor(17, 168, 199);
  doc.roundedRect(totalsBoxX, totalsBoxY + 30, totalsBoxW, 32, 0, 0, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Total', totalsBoxX + 14, totalsBoxY + 50);
  doc.text(formatInvoiceAmount(amount), totalsBoxX + 80, totalsBoxY + 50);

  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(1.2);
  doc.roundedRect(38, 420, pageWidth - 76, 48, 8, 8, 'S');
  doc.setTextColor(17, 168, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Amount in words:', 52, 438);
  doc.setTextColor(35, 35, 35);
  doc.setFont('helvetica', 'normal');
  doc.text('Five Hundred Only', 160, 438);

  const paymentY = 490;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(38, paymentY, pageWidth - 76, 74, 8, 8, 'F');
  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(1);
  doc.roundedRect(38, paymentY, pageWidth - 76, 74, 8, 8, 'S');

  doc.setTextColor(17, 168, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('QR Code Type', 54, paymentY + 22);
  doc.text(':', 155, paymentY + 22);
  doc.text('UPI Payment', 165, paymentY + 22);

  doc.text('UPI ID', 54, paymentY + 42);
  doc.text(':', 155, paymentY + 42);
  doc.text(upiId, 165, paymentY + 42);

  doc.text('Total', 54, paymentY + 62);
  doc.text(':', 155, paymentY + 62);
  doc.text(formatInvoiceAmount(amount), 165, paymentY + 62);

  const qrData = await QRCode.toDataURL(generateUpiLink(upiId, amount, donorName), {
    width: 120,
    margin: 1,
    errorCorrectionLevel: 'M'
  });

  doc.addImage(qrData, 'PNG', pageWidth - 180, paymentY + 6, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(8);
  doc.text('Scan and pay with any UPI / IMPS app', pageWidth - 170, paymentY + 110, { align: 'center' });

  doc.setDrawColor(17, 168, 199);
  doc.setLineWidth(1);
  doc.line(38, 584, pageWidth - 38, 584);

  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Notes:', 52, 603);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Omash Chavithi 2025 - Adranam Street, Allagadda', 52, 620);
  doc.text('Thank you for your generous support and devotion.', 52, 634);

  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Signature', 90, 686);
  doc.text('Seal', pageWidth - 120, 686);

  drawInvoiceSignature(doc, 70, 705);
  drawInvoiceSeal(doc, pageWidth - 120, 710);

  doc.save(`invoice-${invoiceNumber}.pdf`);
};

function DonationsTab() {
  const { donations, setDonations, paymentQrImage, setPaymentQrImage } = useAppContext();
  const [invoiceFilter, setInvoiceFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [invoiceSearch, setInvoiceSearch] = useState('');

  const handleQrImageChange = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (result.length <= 500000) setPaymentQrImage(result);
      else window.alert('Please upload a QR image smaller than 500 KB.');
    };
    reader.readAsDataURL(file);
  };

  const updateStatus = (id: string, status: string) => {
    const donation = donations.find((d: any) => d.id === id);
    if (!donation) return;

    const isApproving = status === 'approved' && donation.status !== 'approved';
    if (isApproving) {
      const shouldSend = window.confirm('Approve this donation and send the invoice to the donor on WhatsApp?');
      if (!shouldSend) return;
    }

    const updatedDonation = isApproving
      ? {
          ...donation,
          status,
          mobile: donation.mobile || donation.phone || '',
          invoiceNumber: donation.invoiceNumber || generateInvoiceNumber(donation),
          invoiceGeneratedAt: donation.invoiceGeneratedAt || new Date().toISOString()
        }
      : { ...donation, status, mobile: donation.mobile || donation.phone || '' };

    setDonations(donations.map((d: any) => d.id === id ? updatedDonation : d));

    if (isApproving) {
      sendDonationInvoiceToWhatsApp(updatedDonation);
    }
  };

  const remove = (id: string) => {
    if(window.confirm('Are you sure you want to remove this donation record?')) {
      setDonations(donations.filter((d: any) => d.id !== id));
    }
  };

  const pendingCount = donations.filter((d: any) => d.status === 'pending').length;
  const approvedCount = donations.filter((d: any) => d.status === 'approved').length;
  const rejectedCount = donations.filter((d: any) => d.status === 'rejected').length;
  const approvedTotal = donations
    .filter((d: any) => d.status === 'approved')
    .reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);
  const pendingTotal = donations
    .filter((d: any) => d.status === 'pending')
    .reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);
  const rejectedTotal = donations
    .filter((d: any) => d.status === 'rejected')
    .reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);

  const filteredDonations = donations.filter((don: any) => {
    const matchesFilter = invoiceFilter === 'all' || don.status === invoiceFilter;
    const q = invoiceSearch.trim().toLowerCase();
    const searchText = [don.name, don.phone, don.mobile, don.invoiceNumber || '', String(don.amount)].join(' ').toLowerCase();
    const matchesSearch = !q || searchText.includes(q);
    return matchesFilter && matchesSearch;
  }).slice().reverse();

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-serif gold-text text-xl">UPI Payment QR</h3>
            <p className="text-xs text-white/50 mt-1">This QR code is shown on the public donation page.</p>
          </div>
          <div className="flex items-center gap-3">
            {paymentQrImage && <img src={paymentQrImage} alt="Current UPI QR" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />}
            <label className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 cursor-pointer">
              {paymentQrImage ? 'Replace QR' : 'Upload QR'}
              <input type="file" accept="image/*" className="hidden" onChange={e => handleQrImageChange(e.target.files?.[0])} />
            </label>
            {paymentQrImage && <button type="button" onClick={() => setPaymentQrImage('')} className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30">Remove</button>}
          </div>
        </div>
      </Card>

      <Card className="glass !p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif gold-text text-xl">Manage Donations</h3>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
              {approvedCount} Verified
            </span>
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/30">
              {pendingCount} Pending
            </span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">
              {rejectedCount} Rejected
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1">Approved</p>
            <p className="text-lg font-bold text-white">{formatCurrency(approvedTotal)}</p>
            <p className="text-[10px] text-white/50">{approvedCount} donations</p>
          </div>
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">Pending</p>
            <p className="text-lg font-bold text-white">{formatCurrency(pendingTotal)}</p>
            <p className="text-[10px] text-white/50">{pendingCount} donations</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-widest text-red-300 mb-1">Rejected</p>
            <p className="text-lg font-bold text-white">{formatCurrency(rejectedTotal)}</p>
            <p className="text-[10px] text-white/50">{rejectedCount} donations</p>
          </div>
        </div>

        <div className="mb-5 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setInvoiceFilter(filter)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    invoiceFilter === filter ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter}
                </button>
              ))}
            </div>
            <div className="w-full md:w-72">
              <input
                type="search"
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                placeholder="Search donor, mobile or invoice"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            Showing {filteredDonations.length} of {donations.length} donation records
          </p>
        </div>

        <div className="space-y-3">
          {filteredDonations.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8 italic border border-dashed border-white/10 rounded-xl">No matching donation records found.</p>
          ) : (
            filteredDonations.map((don: any) => (
              <div key={don.id} className="glass p-4 rounded-xl flex flex-col md:flex-row justify-between gap-4 border border-white/5 relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  don.status === 'approved' ? 'bg-emerald-500' : 
                  don.status === 'rejected' ? 'bg-red-500' : 
                  'bg-yellow-500'
                }`}></div>
                
                <div className="pl-3 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white/90">{don.name}</h4>
                    <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      don.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                      don.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {don.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-white/50">
                    <span className="flex items-center gap-1 font-bold text-[#D4AF37]">{formatCurrency(don.amount)}</span>
                    <span>•</span>
                    <a href={`tel:${don.mobile || don.phone || ''}`} className="hover:text-emerald-400 transition-colors">{don.mobile || don.phone || 'No mobile'}</a>
                    <span>•</span>
                    <span>{new Date(don.date).toLocaleDateString()}</span>
                    {don.invoiceNumber && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">Invoice {don.invoiceNumber}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start md:self-center pl-3 md:pl-0 w-full md:w-auto">
                  {don.screenshot ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <a href={don.screenshot} target="_blank" rel="noopener noreferrer">
                        <img src={don.screenshot} alt="Payment screenshot" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-black/40 flex items-center justify-center border border-white/10 shrink-0 text-white/20 text-[10px] text-center px-1">
                      No Img
                    </div>
                  )}

                  <div className="flex items-center gap-2 ml-auto flex-wrap justify-end">
                    {don.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(don.id, 'approved')} className="p-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 rounded-lg transition-colors tooltip-trigger" title="Approve">
                          <Check size={16} />
                        </button>
                        <button onClick={() => updateStatus(don.id, 'rejected')} className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-colors" title="Decline">
                          <X size={16} />
                        </button>
                      </>
                    )}

                    {don.status === 'approved' && (
                      <>
                        <button
                          onClick={() => {
                            const nextDonation = {
                              ...don,
                              mobile: don.mobile || don.phone || '',
                              invoiceNumber: don.invoiceNumber || generateInvoiceNumber(don),
                              invoiceGeneratedAt: don.invoiceGeneratedAt || new Date().toISOString()
                            };
                            sendDonationInvoiceToWhatsApp(nextDonation);
                          }}
                          className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                          title="Send invoice to donor on WhatsApp"
                        >
                          Send Invoice
                        </button>
                        <button
                          onClick={async () => {
                            await downloadDonationInvoice({
                              ...don,
                              mobile: don.mobile || don.phone || '',
                              invoiceNumber: don.invoiceNumber || generateInvoiceNumber(don),
                              upiId: don.upiId || 'ganeshchavithi@upi',
                              address: don.address || 'Adranam Street\nALLAGADDA\nAndhra Pradesh - 518543'
                            });
                          }}
                          className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
                          title="Download invoice"
                        >
                          Download Invoice
                        </button>
                      </>
                    )}
                    <button onClick={() => remove(don.id)} className="p-2 bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function CommitteeTab() {
  const { committee, setCommittee } = useAppContext();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleImageChange = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setImage(typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    if (editIndex !== null) {
      const updated = [...committee];
      updated[editIndex] = { ...updated[editIndex], name, role, phone, image };
      setCommittee(updated);
      setEditIndex(null);
    } else {
      setCommittee([...committee, { name, role, phone, image }]);
    }

    setName('');
    setRole('');
    setPhone('');
    setImage('');
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setName(committee[index].name);
    setRole(committee[index].role);
    setPhone(committee[index].phone || '');
    setImage(committee[index].image || '');
  };

  const removeMember = (index: number) => {
    if (window.confirm('Remove this committee member?')) {
      const updated = [...committee];
      updated.splice(index, 1);
      setCommittee(updated);
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setName('');
    setRole('');
    setPhone('');
    setImage('');
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">{editIndex !== null ? 'Edit Member' : 'Add New Member'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Ramesh Kumar" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Role</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. President" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Phone Number (Optional)</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="+91 98765 43210" />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Profile Photo (Optional)</label>
            <div className="flex flex-wrap items-center gap-3">
              <input type="file" accept="image/*" onChange={e => handleImageChange(e.target.files?.[0])} className="block w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-white/20" />
              {image && <img src={image} alt="Profile preview" className="w-14 h-14 rounded-full object-cover border border-[#D4AF37]/50" />}
              {image && <button type="button" onClick={() => setImage('')} className="text-xs text-red-300 hover:text-red-200">Remove photo</button>}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-3 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] transition-shadow">
              {editIndex !== null ? 'Update Member' : 'Add Member'}
            </button>
            {editIndex !== null && (
              <button type="button" onClick={cancelEdit} className="px-6 py-3 bg-white/10 rounded-xl text-white font-bold uppercase tracking-wider text-xs hover:bg-white/20 transition-colors border border-white/10">
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>

      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Current Members</h3>
        <div className="space-y-2">
          {committee.map((member: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {member.image ? <img src={member.image} alt={`${member.name} profile`} className="w-full h-full object-cover" /> : <span className="gold-text font-serif">{member.name.charAt(0)}</span>}
                </div>
                <div>
                  <p className="font-bold text-sm text-white/90">{member.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">{member.role}</span>
                  {member.phone && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-xs text-white/50">{member.phone}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(i)} className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => removeMember(i)} className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            </div>
          ))}
          {committee.length === 0 && <p className="text-white/30 text-xs italic p-4 text-center">No committee members added.</p>}
        </div>
      </Card>
    </div>
  );
}

function SettingsTab() {
  const { disclaimer, setDisclaimer, supportedBy, setSupportedBy } = useAppContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const readImage = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (result.length <= 500000) setImage(result);
      else window.alert('Please upload an image smaller than 500 KB.');
    };
    reader.readAsDataURL(file);
  };

  const addSupporter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    setSupportedBy([...supportedBy, { name: name.trim(), image }]);
    setName('');
    setImage('');
  };

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Footer Content</h3>
        <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">Disclaimer</label>
        <textarea value={disclaimer} onChange={event => setDisclaimer(event.target.value)} rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
        <p className="text-[10px] text-white/40 mt-2">Changes are saved automatically and shown on the public site.</p>
      </Card>

      <Card className="glass !p-6">
        <h3 className="font-serif gold-text text-xl mb-4">Supported By</h3>
        <form onSubmit={addSupporter} className="space-y-4">
          <input value={name} onChange={event => setName(event.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="Supporter or sponsor name" />
          <input type="file" accept="image/*" onChange={event => readImage(event.target.files?.[0])} className="block w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white" />
          <div className="flex items-center gap-3">
            {image && <img src={image} alt="Supporter preview" className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/50" />}
            <button type="submit" className="px-4 py-3 saffron-bg rounded-xl text-white font-bold uppercase tracking-wider text-xs">Add Supporter</button>
          </div>
        </form>
        <div className="space-y-2 mt-6">
          {(Array.isArray(supportedBy) ? supportedBy : []).map((supporter: any, index: number) => (
            <div key={`${supporter.name}-${index}`} className="flex items-center justify-between gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                {supporter.image && <img src={supporter.image} alt="" className="w-10 h-10 rounded-full object-cover" />}
                <span className="text-sm text-white/80">{supporter.name}</span>
              </div>
              <button type="button" onClick={() => setSupportedBy(supportedBy.filter((_: any, itemIndex: number) => itemIndex !== index))} className="p-2 bg-red-600/20 text-red-300 rounded-lg" title="Remove supporter"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <Card className="glass !p-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3">
      <div className={`${color} bg-white/5 p-3 rounded-full mx-auto sm:mx-0 w-fit`}>{icon}</div>
      <div>
        <p className="text-xl font-bold text-white leading-tight">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">{label}</p>
      </div>
    </Card>
  );
}

function ManageCard({ title, onClick }: { title: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="glass rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 hover:border-[#D4AF37]/50 transition-colors">
      <span className="font-bold text-xs uppercase tracking-wider gold-text">{title}</span>
      <Settings size={16} className="text-white/40" />
    </div>
  );
}
