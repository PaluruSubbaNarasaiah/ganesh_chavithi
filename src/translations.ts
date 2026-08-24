export const translations = {
  en: {
    // Layout
    appTitle: "Sri Ganga Ghanapathi",
    appSubtitle: "Chavithi 2026",
    committeeName: "Sri Ganga Ghanapathi Committee",
    donate: "Donate",
    home: "Home",
    pooja: "Pooja",
    live: "Live",
    gallery: "Gallery",
    more: "More",
    
    // Home
    poojaTimings: "Pooja Timings",
    liveStream: "Live Stream",
    ganeshStories: "Ganesh Stories",
    ganeshStoriesSub: "Read history & slokas",
    locationMap: "Location & Map",
    locationMapSub: "Directions & parking info",
    competitions: "Competitions",
    competitionsSub: "Register to participate",
    committeeMembers: "Committee Members",
    committeeMembersSub: "Meet the organizers",
    supportedBy: "Supported By",
    
    // Gallery
    digitalDarshan: "Digital Darshan",
    digitalDarshanSub: "Create & view sacred memories.",
    aiDarshan: "AI Ganesh Darshan",
    generateWallpaper: "Generate Custom Wallpaper",
    manifesting: "Manifesting Darshan...",
    generateBtn: "Generate Divine Wallpaper",
    festivalMemories: "Festival Memories",
    saveToDevice: "Save to Device",
    
    // Live
    liveStreaming: "Live Streaming",
    liveStreamingSub: "Watch the celebrations live.",
    currentlyLive: "LIVE",
    joinStream: "Join the virtual darshan. Feel the divine presence from anywhere in the world.",
    viewers: "Viewers",
    
    // Schedule
    scheduleTitle: "Pooja Timings",
    scheduleSub: "Daily schedule of events & poojas.",
    heldBy: "Held By",
    
    // Committee
    committeeTitle: "Committee Members",
    committeeSub: "The organizers behind the festival.",
    
    // Volunteer
    volunteer: "Volunteer Sign-up",
    volunteerSub: "Join us in organizing the festival.",
    volunteerName: "Full Name",
    volunteerPhone: "Phone Number",
    volunteerRole: "How can you help?",
    volunteerSubmit: "Submit Application",
    volunteerSuccess: "Thank you for volunteering! We will contact you soon."
  },
  te: {
    // Layout
    appTitle: "శ్రీ గంగా గణపతి",
    appSubtitle: "చవితి 2026",
    committeeName: "శ్రీ గంగా గణపతి కమిటీ",
    donate: "విరాళం",
    home: "హోమ్",
    pooja: "పూజ",
    live: "లైవ్",
    gallery: "గ్యాలరీ",
    more: "మరిన్ని",
    
    // Home
    poojaTimings: "పూజా సమయాలు",
    liveStream: "ప్రత్యక్ష ప్రసారం",
    ganeshStories: "గణేష్ కథలు",
    ganeshStoriesSub: "చరిత్ర మరియు శ్లోకాలు",
    locationMap: "స్థానం & మ్యాప్",
    locationMapSub: "దిశలు & పార్కింగ్ సమాచారం",
    competitions: "పోటీలు",
    competitionsSub: "పాల్గొనడానికి నమోదు చేయండి",
    committeeMembers: "కమిటీ సభ్యులు",
    committeeMembersSub: "నిర్వాహకులను కలవండి",
    supportedBy: "మద్దతుదారులు",
    
    // Gallery
    digitalDarshan: "డిజిటల్ దర్శనం",
    digitalDarshanSub: "పవిత్ర జ్ఞాపకాలను సృష్టించండి.",
    aiDarshan: "AI గణేష్ దర్శనం",
    generateWallpaper: "కస్టమ్ వాల్‌పేపర్‌ను సృష్టించండి",
    manifesting: "దర్శనం సృష్టిస్తోంది...",
    generateBtn: "దైవిక వాల్‌పేపర్‌ను సృష్టించండి",
    festivalMemories: "పండుగ జ్ఞాపకాలు",
    saveToDevice: "సేవ్ చేయండి",
    
    // Live
    liveStreaming: "ప్రత్యక్ష ప్రసారం",
    liveStreamingSub: "వేడుకలను ప్రత్యక్షంగా చూడండి.",
    currentlyLive: "లైవ్",
    joinStream: "వర్చువల్ దర్శనంలో చేరండి. ప్రపంచంలో ఎక్కడి నుండైనా దైవిక ఉనికిని అనుభవించండి.",
    viewers: "వీక్షకులు",
    
    // Schedule
    scheduleTitle: "పూజా సమయాలు",
    scheduleSub: "ఈవెంట్‌లు & పూజల రోజువారీ షెడ్యూల్.",
    heldBy: "నిర్వాహకులు",
    
    // Committee
    committeeTitle: "కమిటీ సభ్యులు",
    committeeSub: "పండుగ వెనుక ఉన్న నిర్వాహకులు.",
    
    // Volunteer
    volunteer: "వాలంటీర్ నమోదు",
    volunteerSub: "పండుగ నిర్వహణలో మాతో చేరండి.",
    volunteerName: "పూర్తి పేరు",
    volunteerPhone: "ఫోన్ నంబర్",
    volunteerRole: "మీరు ఎలా సహాయపడగలరు?",
    volunteerSubmit: "దరఖాస్తు సమర్పించండి",
    volunteerSuccess: "వాలంటీర్‌గా మారినందుకు ధన్యవాదాలు! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము."
  }
};

export type Language = 'en' | 'te';
export type TranslationKey = keyof typeof translations['en'];
