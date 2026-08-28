import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  poojaTimings as defaultTimings, 
  stories as defaultStories, 
  committee as defaultCommittee, 
  gallery as defaultGallery, 
  announcements as defaultAnnouncements 
} from '../data';
import { translations, Language, TranslationKey } from '../translations';

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

  useEffect(() => safeSetItem('gc_language', language), [language]);
  useEffect(() => safeSetItem('gc_announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => safeSetItem('gc_stories', JSON.stringify(stories)), [stories]);
  useEffect(() => safeSetItem('gc_timings', JSON.stringify(poojaTimings)), [poojaTimings]);
  useEffect(() => safeSetItem('gc_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => safeSetItem('gc_committee', JSON.stringify(committee)), [committee]);
  useEffect(() => safeSetItem('gc_live', JSON.stringify(liveEvent)), [liveEvent]);
  useEffect(() => safeSetItem('gc_volunteers', JSON.stringify(volunteers)), [volunteers]);
  useEffect(() => safeSetItem('gc_donations', JSON.stringify(donations)), [donations]);

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
      liveEvent, setLiveEvent,
      volunteers, setVolunteers,
      donations, setDonations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
