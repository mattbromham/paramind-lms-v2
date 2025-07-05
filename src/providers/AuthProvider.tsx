import {
  SessionContextProvider,
  useSession,
} from '@supabase/auth-helpers-react';

import { getSupabase } from '@/lib/supabase';

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const supabase = getSupabase();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}

// Re-export useSession for convenient imports
// eslint-disable-next-line react-refresh/only-export-components
export { useSession };
