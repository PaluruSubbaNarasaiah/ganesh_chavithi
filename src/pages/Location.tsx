import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Navigation, Car, Droplets, HeartPulse } from 'lucide-react';

export default function Location() {
  const { t } = useAppContext();

  return (
    <div className="py-4 flex flex-col gap-6">
      <SectionTitle title={t('locationTitle')} subtitle={t('locationSub')} />

      {/* Map + Amenities side by side */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Google Maps Embed */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-[#D4AF37]/30 min-h-[280px]" style={{ minHeight: 280 }}>
          <iframe
            title="Pandal Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.8946616386632!2d78.51625587485859!3d15.135229801981305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb45d0ec179de5b%3A0x75a82fafedce6b06!2sGANGAMMA%20TEMPLE!5e1!3m2!1sen!2sin!4v1788439775839!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 280, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-3 md:w-44">
          <div className="flex flex-col items-center justify-center p-4 glass rounded-2xl flex-1 gap-2">
            <Car className="text-emerald-400" size={28} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-center text-white/80">{t('parkingAvailable')}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 glass rounded-2xl flex-1 gap-2">
            <Droplets className="text-blue-400" size={28} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-center text-white/80">{t('drinkingWater')}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 glass rounded-2xl flex-1 gap-2">
            <HeartPulse className="text-red-400" size={28} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-center text-white/80">{t('medicalHelp')}</span>
          </div>
        </div>
      </div>

      {/* Open in Google Maps button */}
      <a
        href="https://maps.google.com/?q=Allagadda,Andhra+Pradesh"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white text-base"
        style={{ background: '#F27D26', boxShadow: '0 0 24px rgba(242,125,38,0.45)' }}
      >
        <Navigation size={20} /> {t('openMaps')}
      </a>

      {/* Contact */}
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
