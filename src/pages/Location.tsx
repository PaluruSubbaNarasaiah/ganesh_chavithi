import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { MapPin, Navigation, Car, Droplets, HeartPulse } from 'lucide-react';

export default function Location() {
  const { t } = useAppContext();

  return (
    <div className="py-4 flex flex-col h-full">
      <SectionTitle title={t('locationTitle')} subtitle={t('locationSub')} />

      <Card className="!p-1 overflow-hidden mb-6 flex-1 min-h-[300px] relative border-white/10">
        <div className="w-full h-full min-h-[300px] bg-black/40 flex items-center justify-center rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
          <div className="text-center z-10">
            <MapPin size={48} className="mx-auto gold-text mb-2" />
            <p className="font-bold text-sm uppercase tracking-wider">Map View</p>
            <p className="text-xs text-white/50 mt-1">Sri Ganga Ghanapathi Pandal</p>
          </div>
        </div>
      </Card>

      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 rounded-xl saffron-bg text-white font-bold flex items-center justify-center gap-2 mb-8 shadow-[0_0_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] transition-shadow"
      >
        <Navigation size={20} /> {t('openMaps')}
      </a>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col items-center p-4 glass rounded-xl">
          <Car className="text-emerald-400 mb-2" size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-center">{t('parkingAvailable')}</span>
        </div>
        <div className="flex flex-col items-center p-4 glass rounded-xl">
          <Droplets className="text-blue-400 mb-2" size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-center">{t('drinkingWater')}</span>
        </div>
        <div className="flex flex-col items-center p-4 glass rounded-xl">
          <HeartPulse className="text-red-400 mb-2" size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-center">{t('medicalHelp')}</span>
        </div>
      </div>

      <SectionTitle title={t('contactUs')} subtitle={t('contactSub')} />
      <div className="space-y-3 pb-8">
        <Card className="!p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <p className="font-bold text-sm text-white/90">{t('phone')}</p>
              <p className="text-xs text-white/60">+91 89705 84121</p>
            </div>
          </div>
          <a href="tel:+918970584121" className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white/20 border border-white/10 transition-colors">{t('call')}</a>
        </Card>
        <Card className="!p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <div>
              <p className="font-bold text-sm text-white/90">{t('whatsapp')}</p>
              <p className="text-xs text-white/60">{t('messageUs')}</p>
            </div>
          </div>
          <a href="https://wa.me/918970584121" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white/20 border border-white/10 transition-colors">{t('chat')}</a>
        </Card>
      </div>
    </div>
  );
}
