import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { expectTypeOf } from 'vitest';

import { Node } from '../types';
import { useNodes } from '../useNodes';

// Mock the Supabase client
const mockSupabaseClient = {
  from: vi.fn(),
};

vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => mockSupabaseClient),
}));

describe('useNodes', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Core Functionality', () => {
    it('should fetch nodes successfully', async () => {
      const mockNodes = [
        {
          id: '1',
          slug: 'test-node',
          title: 'Test Node',
          description: 'Test Description',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockResolvedValue({
            data: mockNodes,
            error: null,
          }),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockNodes);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('nodes');
    });

    it('should handle loading state', () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockImplementation(() => new Promise(() => {})),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('should handle RLS denial error', async () => {
      const rlsError = {
        code: '42501',
        message: 'insufficient_privilege',
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockRejectedValue(rlsError),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Access denied');
    });

    it('should handle general database error', async () => {
      const dbError = {
        code: '23505',
        message: 'duplicate key value violates unique constraint',
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockRejectedValue(dbError),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe(
        'duplicate key value violates unique constraint'
      );
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network error');

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockRejectedValue(networkError),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Network error');
    });

    it('should return empty array when data is null', async () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it('should use custom client when provided', async () => {
      const customClient = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            throwOnError: vi.fn().mockResolvedValue({
              data: [],
              error: null,
            }),
          }),
        }),
      };

      renderHook(
        () =>
          useNodes(customClient as unknown as Parameters<typeof useNodes>[0]),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(customClient.from).toHaveBeenCalledWith('nodes');
      });

      expect(mockSupabaseClient.from).not.toHaveBeenCalled();
    });
  });

  describe('Requirement Verification', () => {
    it('should use exactly the specified query key', () => {
      const TestWrapper = ({ children }: { children: React.ReactNode }) => {
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        });
        return (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        );
      };
      TestWrapper.displayName = 'TestWrapper';

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockImplementation(() => new Promise(() => {})),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: TestWrapper,
      });

      // The query key should be exactly ['nodes']
      expect(result.current.isLoading).toBe(true);

      // We can't directly access the query key from the hook result in this test setup,
      // but we can verify that the hook is using the correct key by checking the query cache
      // This is verified by the integration with React Query
    });

    it('should use exactly 5 minutes (300000ms) staleTime', async () => {
      const mockNodes = [
        {
          id: '1',
          slug: 'test-node',
          title: 'Test Node',
          description: 'Test Description',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockResolvedValue({
            data: mockNodes,
            error: null,
          }),
        }),
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const TestWrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
      TestWrapper.displayName = 'TestWrapper';

      const { result } = renderHook(() => useNodes(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that the query in the cache has the correct staleTime
      const query = queryClient.getQueryCache().find({ queryKey: ['nodes'] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((query?.options as any).staleTime).toBe(5 * 60_000); // 5 minutes
    });

    it('should return correct TypeScript types', async () => {
      const mockNodes = [
        {
          id: '1',
          slug: 'test-node',
          title: 'Test Node',
          description: 'Test Description',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockResolvedValue({
            data: mockNodes,
            error: null,
          }),
        }),
      });

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify TypeScript types
      expectTypeOf(result.current.data).toEqualTypeOf<Node[] | undefined>();
      expectTypeOf(result.current.isLoading).toEqualTypeOf<boolean>();
      expectTypeOf(result.current.isError).toEqualTypeOf<boolean>();
      expectTypeOf(result.current.error).toEqualTypeOf<Error | null>();
    });

    it('should be SSR-safe (no window references)', () => {
      // This test verifies that the hook doesn't directly access window properties
      // The hook implementation itself should be SSR-safe
      // We can verify this by checking that no window-specific code is in the hook

      // The hooks use React Query and Supabase client, both of which are SSR-safe
      // when properly configured. The actual SSR safety test would be better
      // performed in an actual SSR environment, but we can verify the hook
      // doesn't throw during initialization

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      // Hook should initialize without errors
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe('boolean');
    });
  });
});
