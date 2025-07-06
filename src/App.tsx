import AuthButton from '@/components/AuthButton';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { usePing } from '@/hooks/usePing';
import { useTheme } from '@/lib/useTheme';

function App() {
  // Initialize theme functionality (Shift+D to toggle)
  useTheme();

  // Test TanStack Query integration
  const {
    data: pingData,
    isLoading: isPingLoading,
    isError: isPingError,
  } = usePing();

  return (
    <div className="min-h-screen bg-bg text-text-high">
      {/* Header with AuthButton */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-text-high">Paramind LMS</h1>
          <AuthButton />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-4xl font-bold text-text-high">
          Paramind LMS bootstrap OK
        </h1>
        <div className="mb-6 text-sm text-text-medium">
          Database status:{' '}
          {isPingLoading
            ? 'Checking...'
            : isPingError
              ? 'Error'
              : `Connected (${pingData})`}
        </div>
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
