import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Bell } from 'lucide-react';

export default function Schedule() {
  const { poojaTimings, t, language } = useAppContext();

  return (
    <div className="py-4">
      <SectionTitle title={t('scheduleTitle')} subtitle={t('scheduleSub')} />

      {poojaTimings.length === 0 ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="pl-6 border-l border-white/20 space-y-3 animate-pulse">
              <div className="h-5 w-32 bg-white/10 rounded" />
              <div className="h-3 w-20 bg-white/5 rounded" />
              <div className="h-14 bg-white/5 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {poojaTimings.map((dayPlan: any, i: number) => (
            <div key={i} className="relative pl-6 md:pl-8 border-l border-white/20">
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[#0a0502] border-2 border-[#D4AF37]"></div>
              <div className="mb-4">
                <h3 className="text-lg font-serif font-bold gold-text">
                  {language === 'te' ? (dayPlan.dayTe || dayPlan.day) : dayPlan.day}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">
                  {language === 'te' ? (dayPlan.dateTe || dayPlan.date) : dayPlan.date}
                </p>
              </div>
              <div className="space-y-3">
                {dayPlan.events.length === 0 ? (
                  <p className="text-white/30 text-xs italic">{t('noEvents')}</p>
                ) : (
                  dayPlan.events.map((event: any, j: number) => (
                    <Card key={j} className="!p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-white/90">{event.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-white/50">{event.time}</p>
                          {event.heldBy && (
                            <>
                              <span className="text-white/20 text-[10px]">•</span>
                              <span className="text-[10px] uppercase tracking-wider text-gold-text">{t('heldBy')}: {event.heldBy}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <button className="p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5 transition-colors">
                        <Bell size={18} />
                      </button>
                    </Card>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
