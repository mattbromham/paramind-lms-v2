import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getSupabase } from '@/lib/supabase';
import { useSession } from '@/providers/AuthProvider';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SignInDialog({
  open,
  onOpenChange,
}: SignInDialogProps) {
  const supabase = getSupabase();
  const session = useSession();

  // Close dialog when user signs in
  React.useEffect(() => {
    if (session) {
      onOpenChange(false);
      toast.success('Signed in successfully');
    }
  }, [session, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to Paramind LMS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: '0.5rem',
                },
                anchor: {
                  color: 'hsl(var(--pm-primary))',
                },
              },
            }}
            providers={['google']}
            view="sign_in"
            showLinks={false}
            redirectTo={window.location.origin}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
