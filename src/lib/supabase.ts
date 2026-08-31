import { createClient } from '@supabase/supabase-js';

// These are intentionally public — Supabase anon keys are designed for browser use.
// Data is protected by Row Level Security (RLS) policies in Supabase, not by keeping this key secret.
const SUPABASE_URL = 'https://htgfsbmdmnzmjafglgdo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zGoYo_VRiG_NUdcEJROJUg_DPyRgFXF';

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
