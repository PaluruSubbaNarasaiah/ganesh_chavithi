import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  poojaTimings as defaultTimings,
  stories as defaultStories,
  committee as defaultCommittee,
  gallery as defaultGallery,
  announcements as defaultAnnouncements,
} from '../data';
import { translations, Language, TranslationKey } from '../translations';
import { supabase } from '../lib/supabase';

const AppContext = createContext<any>(null);

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'admin2026';

const safeGet = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const safeSet = (key: string, v: string) => { try { localStorage.setItem(key, v); } catch { /* quota */ } };
const safeRemove = (key: string) => { try { localStorage.removeItem(key); } catch { /* ignore */ } };
const fromLS = <T,>(key: string, fallback: T): T => {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};

async function sbFetch(table: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
  if (error) { console.warn(`Supabase fetch ${table}:`, error.message); return null; }
  return data;
}

async function sbUpsert(table: string, row: object) {
  if (!supabase) return;
  const { error } = await supabase.from(table).upsert(row as any);
  if (error) console.warn(`Supabase upsert ${table}:`, error.message);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(
    () => safeGet('gc_admin_session') === 'true'
  );

  const adminLogin = useCallback((passcode: string): boolean => {
    if (passcode === ADMIN_PASSCODE) {
      safeSet('gc_admin_session', 'true');
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    safeRemove('gc_admin_session');
    setIsAdminLoggedIn(false);
  }, []);

  const [language, setLanguage] = useState<Language>(
    () => (safeGet('gc_language') as Language) || 'en'
  );

  const [announcements, setAnnouncements] = useState<string[]>(
    () => fromLS('gc_announcements', defaultAnnouncements)
  );
  const [stories, setStories] = useState(
    () => fromLS('gc_stories', defaultStories)
  );
  const [poojaTimings, setPoojaTimings] = useState(
    () => fromLS('gc_timings', defaultTimings)
  );
  const [gallery, setGallery] = useState(() => {
    const saved = fromLS<any[]>('gc_gallery', []);
    const filtered = saved.filter((img) => typeof img.url === 'string' && img.url.length < 500_000);
    return filtered.length ? filtered : defaultGallery;
  });
  const [committee, setCommittee] = useState(
    () => fromLS('gc_committee', defaultCommittee)
  );
  const [liveEvent, setLiveEvent] = useState(
    () => fromLS('gc_live', {
      isLive: true,
      title: 'Evening Maha Harathi',
      description: 'Join us for the special evening prayers.',
      viewers: 1248,
      url: 'https://images.unsplash.com/photo-1662057790855-322d7a22d363?auto=format&fit=crop&q=80',
    })
  );
  const [volunteers, setVolunteers] = useState<any[]>(
    () => fromLS('gc_volunteers', [])
  );
  const [donations, setDonations] = useState<any[]>(
    () => fromLS('gc_donations', [])
  );

  // Persist to localStorage
  useEffect(() => safeSet('gc_language', language), [language]);
  useEffect(() => safeSet('gc_announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => safeSet('gc_stories', JSON.stringify(stories)), [stories]);
  useEffect(() => safeSet('gc_timings', JSON.stringify(poojaTimings)), [poojaTimings]);
  useEffect(() => safeSet('gc_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => safeSet('gc_committee', JSON.stringify(committee)), [committee]);
  useEffect(() => safeSet('gc_live', JSON.stringify(liveEvent)), [liveEvent]);
  useEffect(() => safeSet('gc_volunteers', JSON.stringify(volunteers)), [volunteers]);
  useEffect(() => safeSet('gc_donations', JSON.stringify(donations)), [donations]);

  // Load from Supabase on mount
  useEffect(() => {
    (async () => {
      const [anns, comm, vols, dons] = await Promise.all([
        sbFetch('announcements'),
        sbFetch('committee'),
        sbFetch('volunteers'),
        sbFetch('donations'),
      ]);
      if (anns?.length) setAnnouncements(anns.map((r: any) => r.text));
      if (comm?.length) setCommittee(comm.map(({ id: _id, created_at: _c, ...rest }: any) => rest));
      if (vols?.length) setVolunteers(vols.map(({ created_at: _c, ...rest }: any) => rest));
      if (dons?.length) setDonations(dons.map(({ created_at: _c, ...rest }: any) => rest));
    })();
  }, []);

  // Supabase-aware setters
  const setAnnouncementsSync = useCallback(async (next: string[]) => {
    setAnnouncements(next);
    if (!supabase) return;
    await supabase.from('announcements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const text of next) await sbUpsert('announcements', { text });
  }, []);

  const setCommitteeSync = useCallback(async (next: any[]) => {
    setCommittee(next);
    if (!supabase) return;
    await supabase.from('committee').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const m of next) await sbUpsert('committee', m);
  }, []);

  const setVolunteersSync = useCallback(async (next: any[]) => {
    setVolunteers(next);
    for (const v of next) await sbUpsert('volunteers', v);
  }, []);

  const setDonationsSync = useCallback(async (next: any[]) => {
    setDonations(next);
    for (const d of next) await sbUpsert('donations', d);
  }, []);

  const t = (key: TranslationKey) =>
    translations[language][key] || translations['en'][key] || key;

  return (
    <AppContext.Provider value={{
      isAdminLoggedIn, adminLogin, adminLogout,
      language, setLanguage, t,
      announcements, setAnnouncements: setAnnouncementsSync,
      stories, setStories,
      poojaTimings, setPoojaTimings,
      gallery, setGallery,
      committee, setCommittee: setCommitteeSync,
      liveEvent, setLiveEvent,
      volunteers, setVolunteers: setVolunteersSync,
      donations, setDonations: setDonationsSync,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
