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

// Read one key from site_state
async function sbGet(key: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('site_state')
    .select('value')
    .eq('key', key)
    .single();
  if (error) { console.warn(`Supabase get [${key}]:`, error.message); return null; }
  return data?.value ?? null;
}

// Write one key to site_state (upsert)
async function sbSet(key: string, value: unknown) {
  if (!supabase) return;
  const { error } = await supabase
    .from('site_state')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) console.warn(`Supabase set [${key}]:`, error.message);
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

  // Load all keys from site_state on mount
  useEffect(() => {
    (async () => {
      const [anns, comm, vols, dons, live, timings] = await Promise.all([
        sbGet('announcements'),
        sbGet('committee'),
        sbGet('volunteers'),
        sbGet('donations'),
        sbGet('liveEvent'),
        sbGet('poojaTimings'),
      ]);
      if (Array.isArray(anns)) setAnnouncements(anns);
      if (Array.isArray(comm)) setCommittee(comm);
      if (Array.isArray(vols)) setVolunteers(vols);
      if (Array.isArray(dons)) setDonations(dons);
      if (live && typeof live === 'object') setLiveEvent(live);
      if (Array.isArray(timings)) setPoojaTimings(timings);
    })();
  }, []);

  // Realtime: sync site_state changes from other sessions
  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('site_state_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_state' }, (payload: any) => {
        const { key, value } = payload.new ?? {};
        if (!key) return;
        if (key === 'announcements' && Array.isArray(value)) setAnnouncements(value);
        if (key === 'committee' && Array.isArray(value)) setCommittee(value);
        if (key === 'volunteers' && Array.isArray(value)) setVolunteers(value);
        if (key === 'donations' && Array.isArray(value)) setDonations(value);
        if (key === 'liveEvent' && value) setLiveEvent(value);
        if (key === 'poojaTimings' && Array.isArray(value)) setPoojaTimings(value);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Supabase-aware setters
  const setAnnouncementsSync = useCallback(async (next: string[]) => {
    setAnnouncements(next);
    await sbSet('announcements', next);
  }, []);

  const setCommitteeSync = useCallback(async (next: any[]) => {
    setCommittee(next);
    await sbSet('committee', next);
  }, []);

  const setVolunteersSync = useCallback(async (next: any[]) => {
    setVolunteers(next);
    await sbSet('volunteers', next);
  }, []);

  const setDonationsSync = useCallback(async (next: any[]) => {
    setDonations(next);
    await sbSet('donations', next);
  }, []);

  const setLiveEventSync = useCallback(async (next: any) => {
    setLiveEvent(next);
    await sbSet('liveEvent', next);
  }, []);

  const setPoojaTimingsSync = useCallback(async (next: any[]) => {
    setPoojaTimings(next);
    await sbSet('poojaTimings', next);
  }, []);

  const t = (key: TranslationKey) =>
    translations[language][key] || translations['en'][key] || key;

  return (
    <AppContext.Provider value={{
      isAdminLoggedIn, adminLogin, adminLogout,
      language, setLanguage, t,
      announcements, setAnnouncements: setAnnouncementsSync,
      stories, setStories,
      poojaTimings, setPoojaTimings: setPoojaTimingsSync,
      gallery, setGallery,
      committee, setCommittee: setCommitteeSync,
      liveEvent, setLiveEvent: setLiveEventSync,
      volunteers, setVolunteers: setVolunteersSync,
      donations, setDonations: setDonationsSync,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
