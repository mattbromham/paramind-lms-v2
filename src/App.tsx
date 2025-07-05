import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-4xl font-bold">Paramind LMS bootstrap OK</h1>
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;
