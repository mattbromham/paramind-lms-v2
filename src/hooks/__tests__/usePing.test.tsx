import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { usePing } from '../usePing';

// Mock the Supabase client
vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => ({
    rpc: vi.fn().mockResolvedValue({
      data: 'pong',
      error: null,
    }),
  })),
}));

describe('usePing', () => {
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

  it('should return "pong" from the database', async () => {
    const { result } = renderHook(() => usePing(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBe('pong');
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => usePing(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});
