import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = url && key ? createClient(url, key) : null;

// Upload a profile image file to Supabase Storage, returns public URL or null
export async function uploadProfileImage(file: File, folder: 'committee' | 'volunteers'): Promise<string | null> {
  if (!supabase) return null;
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
