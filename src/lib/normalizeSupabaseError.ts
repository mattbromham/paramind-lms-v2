import { AuthError, PostgrestError } from '@supabase/supabase-js';

/**
 * Normalizes Supabase errors into user-friendly Error objects.
 *
 * @param error - The error from Supabase (PostgrestError or AuthError)
 * @returns A normalized Error object with appropriate message
 */
export function normalizeSupabaseError(
  error: PostgrestError | AuthError | Error
): Error {
  // If it's already a generic Error, return as-is
  if (error instanceof Error && !('code' in error)) {
    return error;
  }

  // Handle PostgrestError (database errors)
  if ('code' in error && typeof error.code === 'string') {
    // RLS denial - PostgreSQL error code 42501
    if (error.code === '42501') {
      return new Error('Access denied');
    }

    // Other PostgreSQL errors - use the error message
    return new Error(error.message || 'Database error');
  }

  // Handle AuthError
  if (error instanceof AuthError) {
    return new Error(error.message || 'Authentication error');
  }

  // Fallback for any other error type
  return new Error('An unexpected error occurred');
}
