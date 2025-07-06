import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { Client } from 'pg';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { useLesson, useNodes } from '../index';

describe('Hooks Integration Tests', () => {
  let db: Client;
  let testLessonId: string;

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

  beforeAll(async () => {
    // Skip if not in CI/test environment with Supabase running
    if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
      console.log('Skipping integration tests - Supabase not available');
      return;
    }

    // Initialize database connection
    const dbUrl =
      process.env.SUPABASE_DB_URL ||
      'postgresql://postgres:postgres@localhost:54322/postgres';
    db = new Client({
      connectionString: dbUrl,
    });

    try {
      await db.connect();
      console.log('Connected to database for hooks integration testing');

      // Setup test data
      await setupTestData();
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  });

  afterAll(async () => {
    if (db) {
      await cleanupTestData();
      await db.end();
    }
  });

  beforeEach(() => {
    // Skip if not in CI/test environment
    if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
      console.log('Skipping test - Supabase not available');
      return;
    }
  });

  async function setupTestData() {
    // Create test lesson
    const lessonResult = await db.query(`
      INSERT INTO lessons (slug, title, content_md) 
      VALUES ('integration-test-lesson', 'Integration Test Lesson', '# Test Content')
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
      RETURNING id;
    `);
    testLessonId = lessonResult.rows[0]?.id;

    // Create test node
    await db.query(
      `
      INSERT INTO nodes (slug, title, lesson_id, description) 
      VALUES ('integration-test-node', 'Integration Test Node', $1, 'Test Description')
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;
    `,
      [testLessonId]
    );
  }

  async function cleanupTestData() {
    try {
      // Delete test data (cascade will handle related records)
      await db.query('DELETE FROM lessons WHERE slug = $1', [
        'integration-test-lesson',
      ]);
      await db.query('DELETE FROM nodes WHERE slug = $1', [
        'integration-test-node',
      ]);
    } catch (error) {
      console.error('Error cleaning up test data:', error);
    }
  }

  describe('useNodes integration', () => {
    it('should fetch nodes from real database', async () => {
      if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
        console.log('Skipping test - Supabase not available');
        return;
      }

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(
        () => {
          expect(result.current.isSuccess).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeDefined();
      expect(Array.isArray(result.current.data)).toBe(true);

      // Should include our test node
      const testNode = result.current.data?.find(
        (node) => node.slug === 'integration-test-node'
      );
      expect(testNode).toBeDefined();
      expect(testNode?.title).toBe('Integration Test Node');
    });

    it('should handle empty result gracefully', async () => {
      if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
        console.log('Skipping test - Supabase not available');
        return;
      }

      const { result } = renderHook(() => useNodes(), {
        wrapper: createWrapper(),
      });

      await waitFor(
        () => {
          expect(result.current.isSuccess).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeDefined();
      expect(Array.isArray(result.current.data)).toBe(true);
    });
  });

  describe('useLesson integration', () => {
    it('should fetch lesson with related node from real database', async () => {
      if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
        console.log('Skipping test - Supabase not available');
        return;
      }

      const { result } = renderHook(
        () => useLesson('integration-test-lesson'),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(
        () => {
          expect(result.current.isSuccess).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.slug).toBe('integration-test-lesson');
      expect(result.current.data?.title).toBe('Integration Test Lesson');
      expect(result.current.data?.content_md).toBe('# Test Content');

      // Should include related node
      expect(result.current.data?.nodes).toBeDefined();
      expect(result.current.data?.nodes?.slug).toBe('integration-test-node');
    });

    it('should return null for non-existent lesson', async () => {
      if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
        console.log('Skipping test - Supabase not available');
        return;
      }

      const { result } = renderHook(() => useLesson('non-existent-lesson'), {
        wrapper: createWrapper(),
      });

      await waitFor(
        () => {
          expect(result.current.isSuccess).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeNull();
    });

    it('should not fetch when slug is empty', () => {
      if (!process.env.CI && !process.env.TEST_SUPABASE_URL) {
        console.log('Skipping test - Supabase not available');
        return;
      }

      const { result } = renderHook(() => useLesson(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
