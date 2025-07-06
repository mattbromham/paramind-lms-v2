import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { normalizeSupabaseError } from '@/lib/normalizeSupabaseError';
import { getSupabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

import { LessonWithNode } from './types';

/**
 * Hook to fetch a lesson by slug with related node data.
 * Returns the lesson with its associated node information.
 *
 * @param slug - The lesson slug to fetch
 * @param client - Optional Supabase client for dependency injection (defaults to getSupabase())
 * @returns React Query result with lesson data and loading/error states
 */
export const useLesson = (slug: string, client?: SupabaseClient<Database>) => {
  return useQuery({
    queryKey: ['lesson', slug],
    queryFn: async (): Promise<LessonWithNode | null> => {
      const supabase = client || getSupabase();

      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*, nodes(*)')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }

        return data || null;
      } catch (error) {
        throw normalizeSupabaseError(error as Error);
      }
    },
    staleTime: 60_000, // 1 minute as specified
    enabled: !!slug, // Only run query if slug is provided
  });
};
