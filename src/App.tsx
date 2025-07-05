import AuthButton from '@/components/AuthButton';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with AuthButton */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Paramind LMS</h1>
          <AuthButton />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-4xl font-bold">Paramind LMS bootstrap OK</h1>
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
