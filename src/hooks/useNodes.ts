import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { normalizeSupabaseError } from '@/lib/normalizeSupabaseError';
import { getSupabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

import { Node } from './types';

/**
 * Hook to fetch all nodes accessible to the current user.
 * Returns all nodes for authenticated users via Row-Level Security.
 *
 * @param client - Optional Supabase client for dependency injection (defaults to getSupabase())
 * @returns React Query result with nodes data and loading/error states
 */
export const useNodes = (client?: SupabaseClient<Database>) => {
  return useQuery({
    queryKey: ['nodes'],
    queryFn: async (): Promise<Node[]> => {
      const supabase = client || getSupabase();

      try {
        const { data } = await supabase
          .from('nodes')
          .select('*')
          .throwOnError();

        return data || [];
      } catch (error) {
        throw normalizeSupabaseError(error as Error);
      }
    },
    staleTime: 5 * 60_000, // 5 minutes as specified
  });
};
