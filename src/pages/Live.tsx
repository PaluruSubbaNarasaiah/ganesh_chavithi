import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { PlayCircle, Users } from 'lucide-react';

export default function Live() {
  const { liveEvent, t } = useAppContext();

  return (
    <div className="py-4">
      <SectionTitle title={t('liveStreaming')} subtitle={t('liveStreamingSub')} />
      
      <Card className="!p-0 overflow-hidden mb-6 border-white/10">
        <div className="aspect-video bg-black relative flex items-center justify-center group cursor-pointer">
          <img 
            src={liveEvent.url} 
            alt="Live Stream Preview"
            className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
          />
          {liveEvent.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> {t('currentlyLive')}
            </div>
          )}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
            <Users size={14} /> {liveEvent.viewers}
          </div>
          <PlayCircle size={64} className="absolute text-white opacity-80 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="p-5 glass border-0 rounded-none">
          <h3 className="font-serif font-bold text-xl gold-text">{liveEvent.title}</h3>
          <p className="text-white/60 text-sm mt-1">{liveEvent.description}</p>
        </div>
      </Card>
      
      <h3 className="font-bold text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4 px-1">Upcoming Streams</h3>
      <div className="space-y-4">
        <Card className="flex items-center gap-4 !p-3">
          <div className="w-24 h-16 bg-black/40 rounded-lg shrink-0 border border-white/5"></div>
          <div>
            <h4 className="font-bold text-sm text-white/90">Tomorrow Morning Abhishekam</h4>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">Starts at 8:00 AM</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
