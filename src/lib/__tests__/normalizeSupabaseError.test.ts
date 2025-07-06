import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';

import { normalizeSupabaseError } from '../normalizeSupabaseError';

describe('normalizeSupabaseError', () => {
  it('should return generic Error as-is', () => {
    const error = new Error('Generic error');
    const result = normalizeSupabaseError(error);

    expect(result).toBe(error);
    expect(result.message).toBe('Generic error');
  });

  it('should transform RLS denial error (42501) to "Access denied"', () => {
    const rlsError = {
      code: '42501',
      message: 'insufficient_privilege',
      details: 'RLS policy violation',
    } as PostgrestError;

    const result = normalizeSupabaseError(rlsError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Access denied');
  });

  it('should transform other PostgreSQL errors to database error', () => {
    const dbError = {
      code: '23505',
      message: 'duplicate key value violates unique constraint',
      details: 'Key (slug)=(test) already exists.',
    } as PostgrestError;

    const result = normalizeSupabaseError(dbError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(
      'duplicate key value violates unique constraint'
    );
  });

  it('should handle PostgreSQL error without message', () => {
    const dbError = {
      code: '23505',
      message: '',
      details: 'Some details',
    } as PostgrestError;

    const result = normalizeSupabaseError(dbError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Database error');
  });

  it('should transform AuthError to authentication error', () => {
    const authError = new AuthError('Invalid credentials');

    const result = normalizeSupabaseError(authError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Invalid credentials');
  });

  it('should handle AuthError without message', () => {
    const authError = new AuthError('');

    const result = normalizeSupabaseError(authError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Authentication error');
  });

  it('should handle unknown error objects', () => {
    const unknownError = {
      someProperty: 'value',
    } as unknown as Error;

    const result = normalizeSupabaseError(unknownError);

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('An unexpected error occurred');
  });
});
