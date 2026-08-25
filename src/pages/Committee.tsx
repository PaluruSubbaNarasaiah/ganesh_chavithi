import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Phone, MessageCircle } from 'lucide-react';

export default function Committee() {
  const { committee, t } = useAppContext();

  return (
    <div className="py-4">
      <SectionTitle title={t('committeeTitle')} subtitle={t('committeeSub')} />
      
      <div className="space-y-4">
        {committee.map((member: any, i: number) => (
          <Card key={i} className="flex items-center gap-4 !p-4">
            <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
              {member.image ? (
                <img src={member.image} alt={`${member.name} profile`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-serif gold-text">{member.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white/90">{member.name}</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/50">{member.role}</p>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${member.phone}`} className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                <Phone size={18} />
              </a>
              <a href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
