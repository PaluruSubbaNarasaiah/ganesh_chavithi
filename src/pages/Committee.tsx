import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Phone, MessageCircle, Users, Shield } from 'lucide-react';

export default function Committee() {
  const { committee, volunteers, t } = useAppContext();
  const approvedVolunteers = (volunteers as any[]).filter((v) => v.status === 'approved');

  return (
    <div className="py-4 pb-20">
      <SectionTitle title={t('committeeTitle')} subtitle={t('committeeSub')} />

      {/* Committee Members */}
      <div className="flex items-center gap-2 mb-3 mt-2">
        <Shield size={14} className="gold-text" />
        <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] gold-text">Committee Members</h2>
      </div>
      <div className="space-y-3 mb-8">
        {committee.length === 0 && (
          <p className="text-white/30 text-sm text-center py-6 italic">No committee members added yet.</p>
        )}
        {committee.map((member: any, i: number) => (
          <Card key={i} className="flex items-center gap-4 !p-4">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <span className="text-lg font-serif gold-text">{member.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white/90">{member.name}</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]/70">{member.role}</p>
            </div>
            {member.phone && (
              <div className="flex gap-2">
                <a href={`tel:${member.phone}`} className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                  <Phone size={16} />
                </a>
                <a href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                  <MessageCircle size={16} />
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Approved Volunteers */}
      <div className="flex items-center gap-2 mb-3">
        <Users size={14} className="text-orange-400" />
        <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-orange-400">Volunteers</h2>
        {approvedVolunteers.length > 0 && (
          <span className="ml-auto text-[10px] bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full font-bold">
            {approvedVolunteers.length} Active
          </span>
        )}
      </div>
      <div className="space-y-3">
        {approvedVolunteers.length === 0 && (
          <p className="text-white/30 text-sm text-center py-6 italic">No approved volunteers yet.</p>
        )}
        {approvedVolunteers.map((vol: any) => (
          <Card key={vol.id} className="flex items-center gap-4 !p-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
              <span className="text-lg font-serif text-orange-400">{vol.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white/90">{vol.name}</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-orange-400/70">{vol.role}</p>
            </div>
            {vol.phone && (
              <div className="flex gap-2">
                <a href={`tel:${vol.phone}`} className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                  <Phone size={16} />
                </a>
                <a href={`https://wa.me/${vol.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass text-emerald-400 hover:bg-white/10 transition-colors">
                  <MessageCircle size={16} />
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
