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

const safeGet = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const safeSet = (key: string, v: string) => { try { localStorage.setItem(key, v); } catch { /* quota */ } };
const fromLS = <T,>(key: string, fallback: T): T => {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};

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

async function sbSet(key: string, value: unknown) {
  if (!supabase) return;
  const { error } = await supabase
    .from('site_state')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) console.warn(`Supabase set [${key}]:`, error.message);
}

// Strip large base64 screenshots before sending to Supabase
const stripScreenshots = (arr: any[]) =>
  arr.map(({ screenshot: _s, ...rest }) => rest);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminLoading, setAdminLoading] = useState(true);

  // Restore session from Supabase on mount
  useEffect(() => {
    if (!supabase) { setAdminLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setIsAdminLoggedIn(!!data.session);
      setAdminLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const adminLogin = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!supabase) { setAdminLoginError('Supabase not configured.'); return false; }
    setAdminLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAdminLoginError(error.message); return false; }
    return true;
  }, []);

  const adminLogout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
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
      isLive: false,
      title: '',
      description: '',
      viewers: 0,
      url: '',
    })
  );
  const [volunteers, setVolunteers] = useState<any[]>(
    () => fromLS('gc_volunteers', [])
  );
  const [donations, setDonations] = useState<any[]>(
    () => fromLS('gc_donations', [])
  );
  const [notifications, setNotifications] = useState<any[]>(
    () => fromLS('gc_notifications', [])
  );
  const [qrCodes, setQrCodes] = useState<any[]>(
    () => fromLS('gc_qrcodes', [])
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
  useEffect(() => safeSet('gc_notifications', JSON.stringify(notifications)), [notifications]);
  useEffect(() => safeSet('gc_qrcodes', JSON.stringify(qrCodes)), [qrCodes]);

  // Load from Supabase on mount — Supabase is source of truth
  useEffect(() => {
    (async () => {
      const [anns, comm, vols, dons, live, timings, gall, stors, notifs] = await Promise.all([
        sbGet('announcements'),
        sbGet('committee'),
        sbGet('volunteers'),
        sbGet('donations'),
        sbGet('liveEvent'),
        sbGet('poojaTimings'),
        sbGet('gallery'),
        sbGet('stories'),
        sbGet('notifications'),
        sbGet('qrCodes'),
      ]);
      if (Array.isArray(anns)) setAnnouncements(anns);
      if (Array.isArray(comm)) setCommittee(comm);
      if (Array.isArray(vols)) setVolunteers(vols);
      if (Array.isArray(dons)) {
        const lsDons = fromLS<any[]>('gc_donations', []);
        const merged = dons.map((d: any) => {
          const ls = lsDons.find((l: any) => l.id === d.id);
          return ls?.screenshot ? { ...d, screenshot: ls.screenshot } : d;
        });
        setDonations(merged);
      }
      if (live && typeof live === 'object') setLiveEvent(live);
      if (Array.isArray(timings)) setPoojaTimings(timings);
      if (Array.isArray(gall)) setGallery(gall);
      if (Array.isArray(stors)) setStories(stors);
      if (Array.isArray(notifs)) setNotifications(notifs);
      const qrs = await sbGet('qrCodes');
      if (Array.isArray(qrs)) setQrCodes(qrs);
    })();
  }, []);

  // Realtime: push Supabase changes to all open tabs/devices instantly
  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('site_state_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_state' }, (payload: any) => {
        const { key, value } = payload.new ?? {};
        if (!key) return;
        if (key === 'announcements' && Array.isArray(value)) setAnnouncements(value);
        if (key === 'committee' && Array.isArray(value)) setCommittee(value);
        if (key === 'poojaTimings' && Array.isArray(value)) setPoojaTimings(value);
        if (key === 'gallery' && Array.isArray(value)) setGallery(value);
        if (key === 'stories' && Array.isArray(value)) setStories(value);
        if (key === 'liveEvent' && value) setLiveEvent(value);
        if (key === 'volunteers' && Array.isArray(value)) setVolunteers(value);
        if (key === 'notifications' && Array.isArray(value)) setNotifications(value);
        if (key === 'qrCodes' && Array.isArray(value)) setQrCodes(value);
        if (key === 'donations' && Array.isArray(value)) {
          // Merge screenshots from localStorage
          setDonations(prev => value.map((d: any) => {
            const ls = prev.find((l: any) => l.id === d.id);
            return ls?.screenshot ? { ...d, screenshot: ls.screenshot } : d;
          }));
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Setters — write to state + Supabase simultaneously
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
    // Strip screenshots — too large for Supabase JSONB, kept only in localStorage
    await sbSet('donations', stripScreenshots(next));
  }, []);

  const setLiveEventSync = useCallback(async (next: any) => {
    setLiveEvent(next);
    await sbSet('liveEvent', next);
  }, []);

  const setPoojaTimingsSync = useCallback(async (next: any[]) => {
    setPoojaTimings(next);
    await sbSet('poojaTimings', next);
  }, []);

  const setGallerySync = useCallback(async (next: any[]) => {
    setGallery(next);
    // Strip base64 data URIs from gallery too before Supabase write
    const forSupabase = next.map((img: any) =>
      img.url?.startsWith('data:') ? { ...img, url: '' } : img
    );
    await sbSet('gallery', forSupabase);
  }, []);

  const setQrCodesSync = useCallback(async (next: any[]) => {
    setQrCodes(next);
    await sbSet('qrCodes', next);
  }, []);

  const setNotificationsSync = useCallback(async (next: any[]) => {
    setNotifications(next);
    await sbSet('notifications', next);
  }, []);

  const setStoriesSync = useCallback(async (next: any[]) => {
    setStories(next);
    await sbSet('stories', next);
  }, []);

  const t = (key: TranslationKey) =>
    translations[language][key] || translations['en'][key] || key;

  return (
    <AppContext.Provider value={{
      isAdminLoggedIn, adminLogin, adminLogout, adminLoginError, adminLoading,
      language, setLanguage, t,
      announcements, setAnnouncements: setAnnouncementsSync,
      stories, setStories: setStoriesSync,
      poojaTimings, setPoojaTimings: setPoojaTimingsSync,
      gallery, setGallery: setGallerySync,
      committee, setCommittee: setCommitteeSync,
      liveEvent, setLiveEvent: setLiveEventSync,
      volunteers, setVolunteers: setVolunteersSync,
      notifications, setNotifications: setNotificationsSync,
      qrCodes, setQrCodes: setQrCodesSync,
      donations, setDonations: setDonationsSync,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
