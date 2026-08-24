import React, { useState } from 'react';
import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Users, Send, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function Volunteer() {
  const { t, volunteers, setVolunteers } = useAppContext();
  
  const [formData, setFormData] = useState({ name: '', phone: '', role: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    const newVolunteer = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    setVolunteers([...volunteers, newVolunteer]);
    setSubmitted(true);
    setFormData({ name: '', phone: '', role: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-4">
      <SectionTitle title={t('volunteer')} subtitle={t('volunteerSub')} />
      
      <Card className="!p-6 mt-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F27D26]/10 to-transparent"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full saffron-bg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl gold-text">{t('volunteer')}</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{t('volunteerSub')}</p>
            </div>
          </div>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Check size={32} />
              </div>
              <h4 className="font-bold text-emerald-400">{t('volunteerSuccess')}</h4>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2">{t('volunteerName')}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26]/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2">{t('volunteerPhone')}</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26]/50 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2">{t('volunteerRole')}</label>
                <select
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-[#110804] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26]/50 transition-all appearance-none"
                >
                  <option value="" disabled>Select an area</option>
                  <option value="Crowd Management">Crowd Management</option>
                  <option value="Prasadam Distribution">Prasadam Distribution</option>
                  <option value="Pooja Assistance">Pooja Assistance</option>
                  <option value="Decoration & Setup">Decoration & Setup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#F27D26] to-[#D4AF37] text-black font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(242,125,38,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> {t('volunteerSubmit')}
              </button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
