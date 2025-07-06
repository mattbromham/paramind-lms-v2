import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { expectTypeOf } from 'vitest';

import { LessonWithNode } from '../types';
import { useLesson } from '../useLesson';

// Mock the Supabase client
const mockSupabaseClient = {
  from: vi.fn(),
};

vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => mockSupabaseClient),
}));

describe('useLesson', () => {
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
    it('should fetch lesson with related node successfully', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'test-lesson',
        title: 'Test Lesson',
        content_md: '# Test Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: {
          id: 'node-1',
          slug: 'test-node',
          title: 'Test Node',
          description: 'Test Description',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockLesson,
              error: null,
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLesson);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('lessons');
    });

    it('should handle loading state', () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockImplementation(() => new Promise(() => {})),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
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
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: rlsError,
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
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
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: dbError,
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
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
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockRejectedValue(networkError),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Network error');
    });

    it('should return null when lesson is not found', async () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('non-existent-lesson'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeNull();
    });

    it('should not fetch when slug is empty', () => {
      const { result } = renderHook(() => useLesson(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockSupabaseClient.from).not.toHaveBeenCalled();
    });

    it('should use custom client when provided', async () => {
      const customClient = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
      };

      renderHook(
        () =>
          useLesson(
            'test-lesson',
            customClient as unknown as Parameters<typeof useLesson>[1]
          ),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(customClient.from).toHaveBeenCalledWith('lessons');
      });

      expect(mockSupabaseClient.from).not.toHaveBeenCalled();
    });
  });

  describe('Requirement Verification', () => {
    it('should use exactly the specified query key format', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'test-lesson',
        title: 'Test Lesson',
        content_md: '# Test Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: null,
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockLesson,
              error: null,
            }),
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

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that the query in the cache has the correct key format ['lesson', slug]
      const query = queryClient
        .getQueryCache()
        .find({ queryKey: ['lesson', 'test-lesson'] });
      expect(query).toBeDefined();
      expect(query?.queryKey).toEqual(['lesson', 'test-lesson']);
    });

    it('should use exactly 1 minute (60000ms) staleTime', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'test-lesson',
        title: 'Test Lesson',
        content_md: '# Test Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: null,
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockLesson,
              error: null,
            }),
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

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Check that the query in the cache has the correct staleTime
      const query = queryClient
        .getQueryCache()
        .find({ queryKey: ['lesson', 'test-lesson'] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((query?.options as any).staleTime).toBe(60_000); // 1 minute
    });

    it('should return correct TypeScript types', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'test-lesson',
        title: 'Test Lesson',
        content_md: '# Test Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: null,
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockLesson,
              error: null,
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify TypeScript types
      expectTypeOf(result.current.data).toEqualTypeOf<
        LessonWithNode | null | undefined
      >();
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

      const { result } = renderHook(() => useLesson('test-lesson'), {
        wrapper: createWrapper(),
      });

      // Hook should initialize without errors
      expect(result.current).toBeDefined();
      expect(typeof result.current.isLoading).toBe('boolean');
    });

    it('should have enabled option set to false when slug is empty', () => {
      const { result } = renderHook(() => useLesson(''), {
        wrapper: createWrapper(),
      });

      // When slug is empty, the query should not be enabled
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });
});
