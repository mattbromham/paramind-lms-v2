import { createClient, SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  throw new Error('Missing Supabase env vars');
}

let browserClient: SupabaseClient<Database> | null = null;

/** Call in components – returns the right client for the current environment */
export const getSupabase = (): SupabaseClient<Database> => {
  if (typeof window === 'undefined') {
    // SSR/request scope
    return createClient<Database>(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: false },
    });
  }
  // Browser singleton
  if (!browserClient) {
    browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON);
  }
  return browserClient;
};
