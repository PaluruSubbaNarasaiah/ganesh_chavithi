import React, { useState } from 'react';
import { Card } from '../components/ui';
import { Users, QrCode, Heart, Trophy, Settings, LogOut, Plus, Trash2, Megaphone, Calendar, Image as ImageIcon, BookOpen, Video, LayoutDashboard, Edit2, X, Check, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import heroImage from '../assets/images/regenerated_image_1787252044935.png';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">Passcode</label>
              <input type="password" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-center tracking-widest text-lg" placeholder="••••" />
            </div>
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
          <button onClick={() => setIsLoggedIn(false)} className="p-2 text-white/50 hover:text-white transition-colors">
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

function DonationsTab() {
  const { donations, setDonations } = useAppContext();

  const updateStatus = (id: string, status: string) => {
    setDonations(donations.map((d: any) => d.id === id ? { ...d, status } : d));
  };

  const remove = (id: string) => {
    if(window.confirm('Are you sure you want to remove this donation record?')) {
      setDonations(donations.filter((d: any) => d.id !== id));
    }
  };

  const pendingCount = donations.filter((d: any) => d.status === 'pending').length;
  const approvedCount = donations.filter((d: any) => d.status === 'approved').length;

  return (
    <div className="space-y-6">
      <Card className="glass !p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif gold-text text-xl">Manage Donations</h3>
          <div className="flex gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
              {approvedCount} Verified
            </span>
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/30">
              {pendingCount} Pending
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {donations.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8 italic border border-dashed border-white/10 rounded-xl">No donations submitted yet.</p>
          ) : (
            donations.slice().reverse().map((don: any) => (
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
                    <span className="flex items-center gap-1 font-bold text-[#D4AF37]">₹ {don.amount}</span>
                    <span>•</span>
                    <a href={`tel:${don.phone}`} className="hover:text-emerald-400 transition-colors">{don.phone}</a>
                    <span>•</span>
                    <span>{new Date(don.date).toLocaleDateString()}</span>
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

                  <div className="flex items-center gap-2 ml-auto">
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
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    if (editIndex !== null) {
      const updated = [...committee];
      updated[editIndex] = { name, role, phone };
      setCommittee(updated);
      setEditIndex(null);
    } else {
      setCommittee([...committee, { name, role, phone }]);
    }

    setName('');
    setRole('');
    setPhone('');
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setName(committee[index].name);
    setRole(committee[index].role);
    setPhone(committee[index].phone || '');
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
          ))}
          {committee.length === 0 && <p className="text-white/30 text-xs italic p-4 text-center">No committee members added.</p>}
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
