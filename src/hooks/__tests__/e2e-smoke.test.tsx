import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLesson, useNodes } from '../index';

// Mock the Supabase client
const mockSupabaseClient = {
  from: vi.fn(),
};

vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => mockSupabaseClient),
}));

// Test component for useNodes
function NodesListComponent() {
  const { data: nodes, isLoading, isError, error } = useNodes();

  if (isLoading) return <div data-testid="nodes-loading">Loading nodes...</div>;
  if (isError)
    return <div data-testid="nodes-error">Error: {error?.message}</div>;

  return (
    <div data-testid="nodes-list">
      <h2>Nodes List</h2>
      {nodes?.length ? (
        <ul>
          {nodes.map((node) => (
            <li key={node.id} data-testid={`node-${node.slug}`}>
              {node.title}
            </li>
          ))}
        </ul>
      ) : (
        <div data-testid="nodes-empty">No nodes found</div>
      )}
    </div>
  );
}

// Test component for useLesson
function LessonPageComponent({ slug }: { slug: string }) {
  const { data: lesson, isLoading, isError, error } = useLesson(slug);

  // Don't render anything if slug is empty (query is disabled)
  if (!slug) return null;

  if (isLoading)
    return <div data-testid="lesson-loading">Loading lesson...</div>;
  if (isError)
    return <div data-testid="lesson-error">Error: {error?.message}</div>;
  if (!lesson)
    return <div data-testid="lesson-not-found">Lesson not found</div>;

  return (
    <div data-testid="lesson-page">
      <h1>{lesson.title}</h1>
      <div data-testid="lesson-content">{lesson.content_md}</div>
      {lesson.nodes && (
        <div data-testid="lesson-node">
          <h3>Related Node: {lesson.nodes.title}</h3>
          <p>{lesson.nodes.description}</p>
        </div>
      )}
    </div>
  );
}

describe('E2E Smoke Tests', () => {
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

  describe('useNodes in Component', () => {
    it('should render loading state initially', () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockImplementation(() => new Promise(() => {})),
        }),
      });

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <NodesListComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('nodes-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading nodes...')).toBeInTheDocument();
    });

    it('should render nodes list when data is loaded', async () => {
      const mockNodes = [
        {
          id: 'node-1',
          slug: 'intro-node',
          title: 'Introduction Node',
          description: 'An introduction to the topic',
          lesson_id: 'lesson-1',
          cluster_slug: 'getting-started',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
        {
          id: 'node-2',
          slug: 'advanced-node',
          title: 'Advanced Node',
          description: 'Advanced concepts',
          lesson_id: 'lesson-2',
          cluster_slug: 'advanced',
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

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <NodesListComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('nodes-list')).toBeInTheDocument();
      });

      expect(screen.getByText('Nodes List')).toBeInTheDocument();
      expect(screen.getByTestId('node-intro-node')).toBeInTheDocument();
      expect(screen.getByTestId('node-advanced-node')).toBeInTheDocument();
      expect(screen.getByText('Introduction Node')).toBeInTheDocument();
      expect(screen.getByText('Advanced Node')).toBeInTheDocument();
    });

    it('should render error state when fetch fails', async () => {
      const networkError = new Error('Network error');

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockRejectedValue(networkError),
        }),
      });

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <NodesListComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('nodes-error')).toBeInTheDocument();
      });

      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });

    it('should render empty state when no nodes are found', async () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          throwOnError: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      });

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <NodesListComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('nodes-empty')).toBeInTheDocument();
      });

      expect(screen.getByText('No nodes found')).toBeInTheDocument();
    });
  });

  describe('useLesson in Component', () => {
    it('should render loading state initially', () => {
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockImplementation(() => new Promise(() => {})),
          }),
        }),
      });

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="intro-lesson" />
        </TestWrapper>
      );

      expect(screen.getByTestId('lesson-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading lesson...')).toBeInTheDocument();
    });

    it('should render lesson with related node when data is loaded', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'intro-lesson',
        title: 'Introduction Lesson',
        content_md: '# Welcome to the Introduction',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: {
          id: 'node-1',
          slug: 'intro-node',
          title: 'Introduction Node',
          description: 'This is the introduction node',
          lesson_id: 'lesson-1',
          cluster_slug: 'getting-started',
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

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="intro-lesson" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('lesson-page')).toBeInTheDocument();
      });

      expect(screen.getByText('Introduction Lesson')).toBeInTheDocument();
      expect(screen.getByTestId('lesson-content')).toBeInTheDocument();
      expect(
        screen.getByText('# Welcome to the Introduction')
      ).toBeInTheDocument();

      // Check related node
      expect(screen.getByTestId('lesson-node')).toBeInTheDocument();
      expect(
        screen.getByText('Related Node: Introduction Node')
      ).toBeInTheDocument();
      expect(
        screen.getByText('This is the introduction node')
      ).toBeInTheDocument();
    });

    it('should render lesson without nodes when nodes is null', async () => {
      const mockLesson = {
        id: 'lesson-1',
        slug: 'intro-lesson',
        title: 'Introduction Lesson',
        content_md: '# Welcome to the Introduction',
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

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="intro-lesson" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('lesson-page')).toBeInTheDocument();
      });

      expect(screen.getByText('Introduction Lesson')).toBeInTheDocument();
      expect(screen.getByTestId('lesson-content')).toBeInTheDocument();
      expect(screen.queryByTestId('lesson-node')).not.toBeInTheDocument();
    });

    it('should render not found state when lesson is not found', async () => {
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

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="non-existent-lesson" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('lesson-not-found')).toBeInTheDocument();
      });

      expect(screen.getByText('Lesson not found')).toBeInTheDocument();
    });

    it('should render error state when fetch fails', async () => {
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

      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="restricted-lesson" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('lesson-error')).toBeInTheDocument();
      });

      expect(screen.getByText('Error: Access denied')).toBeInTheDocument();
    });

    it('should not render or fetch when slug is empty', () => {
      const TestWrapper = createWrapper();

      render(
        <TestWrapper>
          <LessonPageComponent slug="" />
        </TestWrapper>
      );

      // Should not show loading or fetch data
      expect(screen.queryByTestId('lesson-loading')).not.toBeInTheDocument();
      expect(screen.queryByTestId('lesson-page')).not.toBeInTheDocument();
      expect(screen.queryByTestId('lesson-error')).not.toBeInTheDocument();
      expect(screen.queryByTestId('lesson-not-found')).not.toBeInTheDocument();

      // Should not call supabase
      expect(mockSupabaseClient.from).not.toHaveBeenCalled();
    });
  });
});
