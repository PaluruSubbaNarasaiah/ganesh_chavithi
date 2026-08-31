import { createClient } from '@supabase/supabase-js';

// These are intentionally public — Supabase anon keys are designed for browser use.
// Data is protected by Row Level Security (RLS) policies in Supabase, not by keeping this key secret.
const SUPABASE_URL = 'https://htgfsbmdmnzmjafglgdo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z2ZzYm1kbW56bWphZmdsZ2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Nzg0MjIsImV4cCI6MjEwMzI1NDQyMn0.jOAU_clsFhvL7zdb49f768EOAp9Vpc_2A_-6AkZTUF0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload a profile image file to Supabase Storage, returns public URL or null
export async function uploadProfileImage(file: File, folder: 'committee' | 'volunteers'): Promise<string | null> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('profiles').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) { console.warn('Storage upload error:', error.message); return null; }
  const { data } = supabase.storage.from('profiles').getPublicUrl(path);
  return data.publicUrl;
}
