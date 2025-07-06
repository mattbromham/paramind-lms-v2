import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    TestWrapper.displayName = 'TestWrapper';
    return TestWrapper;
  };

  it('renders the bootstrap message', () => {
    render(<App />, { wrapper: createWrapper() });

    const heading = screen.getByText('Paramind LMS bootstrap OK');
    expect(heading).toBeInTheDocument();
  });

  it('renders the Get Started button', () => {
    render(<App />, { wrapper: createWrapper() });

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });
});
