import { Tables } from '@/types/supabase';

/**
 * Node type derived from Supabase database schema
 */
export type Node = Tables<'nodes'>;

/**
 * Lesson type derived from Supabase database schema
 */
export type Lesson = Tables<'lessons'>;

/**
 * Lesson with related node data (for useLesson hook)
 */
export type LessonWithNode = Lesson & {
  nodes: Node | null;
};
