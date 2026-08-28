import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  poojaTimings as defaultTimings, 
  stories as defaultStories, 
  committee as defaultCommittee, 
  gallery as defaultGallery, 
  announcements as defaultAnnouncements 
} from '../data';
import { translations, Language, TranslationKey } from '../translations';
import { supabase } from '../lib/supabase';

const AppContext = createContext<any>(null);

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage`, e);
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('gc_language') as Language) || 'en'
  );

  const [announcements, setAnnouncements] = useState(() => 
    JSON.parse(localStorage.getItem('gc_announcements') || 'null') || defaultAnnouncements
  );
  
  const [stories, setStories] = useState(() => 
    JSON.parse(localStorage.getItem('gc_stories') || 'null') || defaultStories
  );
  
  const [poojaTimings, setPoojaTimings] = useState(() => 
    JSON.parse(localStorage.getItem('gc_timings') || 'null') || defaultTimings
  );
  
  const [gallery, setGallery] = useState(() => {
    let saved = JSON.parse(localStorage.getItem('gc_gallery') || 'null');
    if (Array.isArray(saved)) {
      // Filter out huge data URIs that might freeze the browser
      saved = saved.filter(img => typeof img.url === 'string' && img.url.length < 500000);
      if (saved.length === 0) saved = defaultGallery;
      return saved;
    }
    return defaultGallery;
  });
  
  const [committee, setCommittee] = useState(() => 
    JSON.parse(localStorage.getItem('gc_committee') || 'null') || defaultCommittee
  );

  const [paymentQrImage, setPaymentQrImage] = useState(() =>
    localStorage.getItem('gc_payment_qr') || ''
  );
  
  const [liveEvent, setLiveEvent] = useState(() => 
    JSON.parse(localStorage.getItem('gc_live') || 'null') || { 
      isLive: true, 
      title: 'Evening Maha Harathi', 
      description: 'Join us for the special evening prayers.', 
      viewers: 1248,
      url: 'https://images.unsplash.com/photo-1662057790855-322d7a22d363?auto=format&fit=crop&q=80'
    }
  );

  const [volunteers, setVolunteers] = useState(() => 
    JSON.parse(localStorage.getItem('gc_volunteers') || 'null') || []
  );

  const [donations, setDonations] = useState(() => 
    JSON.parse(localStorage.getItem('gc_donations') || 'null') || []
  );

  const [remoteStateReady, setRemoteStateReady] = useState(!supabase);
  const [authSession, setAuthSession] = useState<any>(null);

  useEffect(() => safeSetItem('gc_language', language), [language]);
  useEffect(() => safeSetItem('gc_announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => safeSetItem('gc_stories', JSON.stringify(stories)), [stories]);
  useEffect(() => safeSetItem('gc_timings', JSON.stringify(poojaTimings)), [poojaTimings]);
  useEffect(() => safeSetItem('gc_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => safeSetItem('gc_committee', JSON.stringify(committee)), [committee]);
  useEffect(() => safeSetItem('gc_payment_qr', paymentQrImage), [paymentQrImage]);
  useEffect(() => safeSetItem('gc_live', JSON.stringify(liveEvent)), [liveEvent]);
  useEffect(() => safeSetItem('gc_volunteers', JSON.stringify(volunteers)), [volunteers]);
  useEffect(() => safeSetItem('gc_donations', JSON.stringify(donations)), [donations]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    void client.auth.getSession().then(({ data }) => setAuthSession(data.session));
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let active = true;
    const loadRemoteState = async () => {
      const { data, error } = await client.from('site_state').select('key, value');
      if (error) {
        console.warn('Supabase state load failed; using local data.', error.message);
      } else if (active && data) {
        const state = Object.fromEntries(data.map(row => [row.key, row.value]));
        if (state.language) setLanguage(state.language as Language);
        if (state.announcements) setAnnouncements(state.announcements);
        if (state.stories) setStories(state.stories);
        if (state.poojaTimings) setPoojaTimings(state.poojaTimings);
        if (state.gallery) setGallery(state.gallery);
        if (state.committee) setCommittee(state.committee);
        if (state.paymentQrImage !== undefined) setPaymentQrImage(state.paymentQrImage);
        if (state.liveEvent) setLiveEvent(state.liveEvent);
        if (state.volunteers) setVolunteers(state.volunteers);
        if (state.donations) setDonations(state.donations);
      }
      if (active && !error) setRemoteStateReady(true);
    };

    void loadRemoteState();

    const channel = client
      .channel('site-state-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_state' }, payload => {
        const row = payload.new as { key?: string; value?: unknown };
        if (!row.key) return;
        if (row.key === 'language') setLanguage(row.value as Language);
        if (row.key === 'announcements') setAnnouncements(row.value);
        if (row.key === 'stories') setStories(row.value);
        if (row.key === 'poojaTimings') setPoojaTimings(row.value);
        if (row.key === 'gallery') setGallery(row.value);
        if (row.key === 'committee') setCommittee(row.value);
        if (row.key === 'paymentQrImage') setPaymentQrImage(row.value as string);
        if (row.key === 'liveEvent') setLiveEvent(row.value);
        if (row.key === 'volunteers') setVolunteers(row.value);
        if (row.key === 'donations') setDonations(row.value);
      })
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client || !remoteStateReady || !authSession) return;
    const state = { language, announcements, stories, poojaTimings, gallery, committee, paymentQrImage, liveEvent, volunteers, donations };
    void Promise.all(Object.entries(state).map(([key, value]) =>
      client.from('site_state').upsert({ key, value, updated_at: new Date().toISOString() })
    )).catch(error => console.warn('Supabase state save failed.', error));
  }, [remoteStateReady, authSession, language, announcements, stories, poojaTimings, gallery, committee, paymentQrImage, liveEvent, volunteers, donations]);

  // Translation helper function
  const t = (key: TranslationKey) => translations[language][key] || translations['en'][key] || key;

  return (
    <AppContext.Provider value={{
      language, setLanguage, t,
      announcements, setAnnouncements,
      stories, setStories,
      poojaTimings, setPoojaTimings,
      gallery, setGallery,
      committee, setCommittee,
      paymentQrImage, setPaymentQrImage,
      authSession,
      liveEvent, setLiveEvent,
      volunteers, setVolunteers,
      donations, setDonations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
