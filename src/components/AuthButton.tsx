import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { getSupabase } from '@/lib/supabase';
import { useSession } from '@/providers/AuthProvider';

import SignInDialog from './SignInDialog';

export default function AuthButton() {
  const supabase = getSupabase();
  const session = useSession();
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={handleSignOut} aria-label="Sign out">
          Sign out
        </Button>
        <span className="text-sm text-pm-text-low ml-2">
          ({session.user.email})
        </span>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="default"
        className="bg-pm-primary text-white"
        onClick={() => setSignInOpen(true)}
        aria-haspopup="dialog"
      >
        Sign in
      </Button>
      <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
    </>
  );
}
