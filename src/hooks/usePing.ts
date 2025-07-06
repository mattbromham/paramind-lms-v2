import { useQuery } from '@tanstack/react-query';

import { getSupabase } from '@/lib/supabase';

export const usePing = () =>
  useQuery({
    queryKey: ['ping'],
    queryFn: async () => {
      const supabase = getSupabase();
      const { data, error } = await supabase.rpc('ping');
      if (error) throw error;
      return data;
    },
  });
