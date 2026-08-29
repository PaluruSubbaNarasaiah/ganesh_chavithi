import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { FileText, Headphones } from 'lucide-react';

export default function Stories() {
  const { stories, t } = useAppContext();

  return (
    <div className="py-4">
      <SectionTitle title={t('storiesTitle')} subtitle={t('storiesSub')} />

      <div className="space-y-6">
        {stories.length === 0 && (
          <p className="text-white/30 text-sm text-center py-8 italic">{t('noStories')}</p>
        )}
        {stories.map((story: any) => (
          <Card key={story.id} className="p-6">
            <h3 className="text-xl font-serif font-bold gold-text mb-2">{story.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{story.content}</p>

            <div className="flex gap-4 mt-6 pt-4 border-t border-white/10">
              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                <Headphones size={16} /> {t('listenAudio')}
              </button>
              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                <FileText size={16} /> {t('downloadPdf')}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
