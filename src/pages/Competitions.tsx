import { useState } from 'react';
import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';

export default function Competitions() {
  const { t } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-4 pb-20">
      <SectionTitle title={t('competitionsTitle')} subtitle={t('competitionsSub2')} />

      {!submitted ? (
        <Card>
          <form
            className="space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          >
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('participantName')}</label>
              <input type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('age')}</label>
              <input type="number" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('contactPhone')}</label>
              <input type="tel" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">{t('selectEvent')}</label>
              <select required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                <option value="" className="text-black">Choose...</option>
                <option value="rangoli" className="text-black">Rangoli</option>
                <option value="drawing" className="text-black">Drawing</option>
                <option value="dance" className="text-black">Dance</option>
                <option value="singing" className="text-black">Singing</option>
                <option value="fancy" className="text-black">Fancy Dress</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 mt-4 rounded-xl saffron-bg text-white font-bold shadow-[0_0_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] transition-shadow uppercase tracking-wider text-sm">
              {t('registerNow')}
            </button>
          </form>
        </Card>
      ) : (
        <Card className="text-center py-10">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">{t('registeredSuccess')}</h3>
          <p className="text-zinc-400 text-sm">{t('registeredMsg')}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-2 bg-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            {t('registerAnother')}
          </button>
        </Card>
      )}
    </div>
  );
}
