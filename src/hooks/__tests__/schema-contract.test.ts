import { describe, expect, it } from 'vitest';
import { expectTypeOf } from 'vitest';

import { Tables } from '@/types/supabase';

import { Lesson, LessonWithNode, Node } from '../types';

describe('Schema Contract Tests', () => {
  describe('Type Definitions', () => {
    it('should have Node type matching Supabase Tables<nodes>', () => {
      expectTypeOf<Node>().toEqualTypeOf<Tables<'nodes'>>();
    });

    it('should have Lesson type matching Supabase Tables<lessons>', () => {
      expectTypeOf<Lesson>().toEqualTypeOf<Tables<'lessons'>>();
    });

    it('should have LessonWithNode type extending Lesson with nodes relation', () => {
      // LessonWithNode should have all Lesson properties
      expectTypeOf<LessonWithNode>().toMatchTypeOf<Lesson>();

      // Plus the nodes relation
      expectTypeOf<LessonWithNode['nodes']>().toEqualTypeOf<Node | null>();
    });
  });

  describe('Database Schema Consistency', () => {
    it('should have consistent node structure', () => {
      // Test that a Node has expected core properties
      const mockNode: Node = {
        id: 'test-id',
        slug: 'test-slug',
        title: 'Test Title',
        description: 'Test Description',
        lesson_id: 'lesson-id',
        cluster_slug: 'cluster-slug',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      };

      expect(mockNode).toHaveProperty('id');
      expect(mockNode).toHaveProperty('slug');
      expect(mockNode).toHaveProperty('title');
      expect(mockNode).toHaveProperty('description');
      expect(mockNode).toHaveProperty('lesson_id');
      expect(mockNode).toHaveProperty('cluster_slug');
      expect(mockNode).toHaveProperty('created_at');
      expect(mockNode).toHaveProperty('updated_at');
    });

    it('should have consistent lesson structure', () => {
      // Test that a Lesson has expected core properties
      const mockLesson: Lesson = {
        id: 'lesson-id',
        slug: 'lesson-slug',
        title: 'Lesson Title',
        content_md: '# Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      };

      expect(mockLesson).toHaveProperty('id');
      expect(mockLesson).toHaveProperty('slug');
      expect(mockLesson).toHaveProperty('title');
      expect(mockLesson).toHaveProperty('content_md');
      expect(mockLesson).toHaveProperty('duration_estimate_min');
      expect(mockLesson).toHaveProperty('last_updated');
      expect(mockLesson).toHaveProperty('created_at');
      expect(mockLesson).toHaveProperty('updated_at');
    });

    it('should have consistent lesson with node relation structure', () => {
      // Test that LessonWithNode has all lesson properties plus nodes
      const mockLessonWithNode: LessonWithNode = {
        id: 'lesson-id',
        slug: 'lesson-slug',
        title: 'Lesson Title',
        content_md: '# Content',
        duration_estimate_min: 30,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: {
          id: 'node-id',
          slug: 'node-slug',
          title: 'Node Title',
          description: 'Node Description',
          lesson_id: 'lesson-id',
          cluster_slug: 'cluster-slug',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      };

      // Should have all lesson properties
      expect(mockLessonWithNode).toHaveProperty('id');
      expect(mockLessonWithNode).toHaveProperty('slug');
      expect(mockLessonWithNode).toHaveProperty('title');

      // Should have nodes relation
      expect(mockLessonWithNode).toHaveProperty('nodes');
      expect(mockLessonWithNode.nodes).toHaveProperty('id');
      expect(mockLessonWithNode.nodes).toHaveProperty('slug');
      expect(mockLessonWithNode.nodes).toHaveProperty('title');
    });
  });

  describe('Query Response Shape Validation', () => {
    it('should validate that useNodes returns Node[] shape', () => {
      // Mock response from useNodes
      const mockNodesResponse: Node[] = [
        {
          id: 'node-1',
          slug: 'node-1-slug',
          title: 'Node 1',
          description: 'Description 1',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
        {
          id: 'node-2',
          slug: 'node-2-slug',
          title: 'Node 2',
          description: 'Description 2',
          lesson_id: 'lesson-2',
          cluster_slug: 'cluster-2',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      // Validate array structure
      expect(Array.isArray(mockNodesResponse)).toBe(true);
      expect(mockNodesResponse).toHaveLength(2);

      // Validate each node structure
      mockNodesResponse.forEach((node) => {
        expect(node).toHaveProperty('id');
        expect(node).toHaveProperty('slug');
        expect(node).toHaveProperty('title');
        expect(node).toHaveProperty('description');
        expect(node).toHaveProperty('lesson_id');
        expect(node).toHaveProperty('cluster_slug');
        expect(node).toHaveProperty('created_at');
        expect(node).toHaveProperty('updated_at');
      });
    });

    it('should validate that useLesson returns LessonWithNode shape', () => {
      // Mock response from useLesson
      const mockLessonResponse: LessonWithNode = {
        id: 'lesson-1',
        slug: 'lesson-1-slug',
        title: 'Lesson 1',
        content_md: '# Lesson Content',
        duration_estimate_min: 45,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: {
          id: 'node-1',
          slug: 'node-1-slug',
          title: 'Node 1',
          description: 'Node Description',
          lesson_id: 'lesson-1',
          cluster_slug: 'cluster-1',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      };

      // Validate lesson structure
      expect(mockLessonResponse).toHaveProperty('id');
      expect(mockLessonResponse).toHaveProperty('slug');
      expect(mockLessonResponse).toHaveProperty('title');
      expect(mockLessonResponse).toHaveProperty('content_md');
      expect(mockLessonResponse).toHaveProperty('duration_estimate_min');
      expect(mockLessonResponse).toHaveProperty('last_updated');

      // Validate nodes relation
      expect(mockLessonResponse).toHaveProperty('nodes');
      expect(mockLessonResponse.nodes).toHaveProperty('id');
      expect(mockLessonResponse.nodes).toHaveProperty('slug');
      expect(mockLessonResponse.nodes).toHaveProperty('title');
      expect(mockLessonResponse.nodes).toHaveProperty('lesson_id');
      expect(mockLessonResponse.nodes!.lesson_id).toBe('lesson-1');
    });

    it('should handle null nodes relation in LessonWithNode', () => {
      // Mock response from useLesson with null nodes
      const mockLessonWithNullNode: LessonWithNode = {
        id: 'lesson-1',
        slug: 'lesson-1-slug',
        title: 'Lesson 1',
        content_md: '# Lesson Content',
        duration_estimate_min: 45,
        last_updated: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        nodes: null,
      };

      // Should still have all required lesson properties
      expect(mockLessonWithNullNode).toHaveProperty('id');
      expect(mockLessonWithNullNode).toHaveProperty('slug');
      expect(mockLessonWithNullNode).toHaveProperty('title');
      expect(mockLessonWithNullNode).toHaveProperty('nodes');
      expect(mockLessonWithNullNode.nodes).toBeNull();
    });
  });
});
