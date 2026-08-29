import React, { useState, useRef } from 'react';
import { SectionTitle, Card } from '../components/ui';
import { QrCode, Upload, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Donate() {
  const { donations, setDonations, qrCodes, t } = useAppContext();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', amount: '' });
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [activeQr, setActiveQr] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 400 / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
        setScreenshotPreview(canvas.toDataURL('image/jpeg', 0.5));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.amount) return;
    setDonations([...donations, {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      mobile: formData.phone,
      amount: formData.amount,
      screenshot: screenshotPreview,
      status: 'pending',
      date: new Date().toISOString(),
    }]);
    setSubmitted(true);
    setFormData({ name: '', phone: '', amount: '' });
    setScreenshotPreview(null);
  };

  if (submitted) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center h-full">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-500 mb-4">
          <CheckCircle2 size={64} />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">{t('donateThankYou')}</h2>
        <p className="text-zinc-400 mb-8 max-w-xs">{t('donateThankYouMsg')}</p>
        <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors">
          {t('makeAnotherDonation')}
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 pb-20">
      <SectionTitle title={t('donateTitle')} subtitle={t('donateSub')} />

      {/* QR Code Section */}
      {qrCodes && qrCodes.length > 0 ? (
        <Card className="flex flex-col items-center p-6 mb-8 border-[#D4AF37]/20">
          {/* Multi QR navigation */}
          {qrCodes.length > 1 && (
            <div className="flex items-center gap-3 mb-4 w-full justify-center">
              <button
                onClick={() => setActiveQr(i => Math.max(0, i - 1))}
                disabled={activeQr === 0}
                className="p-1.5 glass rounded-full text-white/50 hover:text-white disabled:opacity-20 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                {activeQr + 1} / {qrCodes.length}
              </span>
              <button
                onClick={() => setActiveQr(i => Math.min(qrCodes.length - 1, i + 1))}
                disabled={activeQr === qrCodes.length - 1}
                className="p-1.5 glass rounded-full text-white/50 hover:text-white disabled:opacity-20 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="bg-white p-4 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <img
              src={qrCodes[activeQr]?.imageUrl}
              alt={qrCodes[activeQr]?.label}
              className="w-40 h-40 object-contain"
            />
          </div>

          <p className="font-bold text-lg tracking-widest gold-text uppercase">
            {qrCodes[activeQr]?.label}
          </p>
          {qrCodes[activeQr]?.upiId && (
            <p className="text-white/60 text-sm mt-1 font-mono">{qrCodes[activeQr].upiId}</p>
          )}

          {/* Dot indicators for multiple QRs */}
          {qrCodes.length > 1 && (
            <div className="flex gap-1.5 mt-4">
              {qrCodes.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveQr(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === activeQr ? 'bg-[#D4AF37]' : 'bg-white/20'}`}
                />
              ))}
            </div>
          )}

          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-3 flex gap-3">
            <span>PhonePe</span> • <span>GPay</span> • <span>Paytm</span>
          </p>
        </Card>
      ) : (
        /* Fallback when no QR uploaded yet */
        <Card className="flex flex-col items-center p-8 mb-8 border-[#D4AF37]/20">
          <div className="bg-white p-4 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <QrCode size={160} className="text-black" />
          </div>
          <p className="font-bold text-lg tracking-widest gold-text">GANGAGHANAPATHI@UPI</p>
          <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mt-2 flex gap-3">
            <span>PhonePe</span> • <span>GPay</span> • <span>Paytm</span>
          </p>
        </Card>
      )}

      <h3 className="font-bold text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4 px-1">{t('verifyPayment')}</h3>
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('donorName')}</label>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('mobileNumber')}</label>
            <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Your Mobile Number" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('amount')}</label>
            <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="501" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('paymentScreenshot')}</label>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
            <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-white/40 hover:text-white hover:border-[#D4AF37] transition-colors cursor-pointer bg-black/20 overflow-hidden relative min-h-[80px]">
              {screenshotPreview ? (
                <img src={screenshotPreview} alt="Screenshot preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <>
                  <Upload size={24} className="mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">{t('tapUpload')}</span>
                </>
              )}
            </div>
          </div>
          <button type="submit" className="w-full py-4 mt-2 rounded-xl saffron-bg text-white font-bold shadow-[0_0_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] transition-shadow uppercase tracking-wider text-sm">
            {t('submitDetails')}
          </button>
        </form>
      </Card>
    </div>
  );
}
