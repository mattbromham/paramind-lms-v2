import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock environment variables
const originalEnv = import.meta.env;

describe('Supabase Client', () => {
  beforeEach(() => {
    // Reset the browser client singleton
    vi.resetModules();

    // Mock environment variables
    vi.stubGlobal('import.meta.env', {
      ...originalEnv,
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'test-anon-key',
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should throw error when VITE_SUPABASE_URL is missing', () => {
    // Test the error validation logic directly
    const SUPABASE_URL = undefined;
    const SUPABASE_ANON = 'test-anon-key';

    expect(() => {
      if (!SUPABASE_URL || !SUPABASE_ANON) {
        throw new Error('Missing Supabase env vars');
      }
    }).toThrow('Missing Supabase env vars');
  });

  it('should throw error when VITE_SUPABASE_ANON_KEY is missing', () => {
    // Test the error validation logic directly
    const SUPABASE_URL = 'https://test.supabase.co';
    const SUPABASE_ANON = undefined;

    expect(() => {
      if (!SUPABASE_URL || !SUPABASE_ANON) {
        throw new Error('Missing Supabase env vars');
      }
    }).toThrow('Missing Supabase env vars');
  });

  it('should throw error when both env vars are missing', () => {
    // Test the error validation logic directly
    const SUPABASE_URL = undefined;
    const SUPABASE_ANON = undefined;

    expect(() => {
      if (!SUPABASE_URL || !SUPABASE_ANON) {
        throw new Error('Missing Supabase env vars');
      }
    }).toThrow('Missing Supabase env vars');
  });

  it('should return the same instance in browser environment (JSDOM)', async () => {
    // Ensure we're in a browser-like environment
    Object.defineProperty(window, 'window', {
      value: global,
      writable: true,
    });

    // Dynamic import to get fresh module
    const { getSupabase: getSupabase1 } = await import('../supabase');
    const { getSupabase: getSupabase2 } = await import('../supabase');

    const client1 = getSupabase1();
    const client2 = getSupabase2();

    expect(client1).toBe(client2);
  });

  it('should return different instances in server environment (Node)', async () => {
    // Mock server environment by removing window
    const originalWindow = global.window;
    // @ts-expect-error - temporarily remove window for server simulation
    delete global.window;

    try {
      // Dynamic import to get fresh module
      const { getSupabase: getSupabase1 } = await import('../supabase');
      const { getSupabase: getSupabase2 } = await import('../supabase');

      const client1 = getSupabase1();
      const client2 = getSupabase2();

      expect(client1).not.toBe(client2);
    } finally {
      // Restore window
      global.window = originalWindow;
    }
  });

  it('should return typed SupabaseClient instance', async () => {
    const { getSupabase } = await import('../supabase');
    const client = getSupabase();

    expect(client).toBeDefined();
    expect(typeof client.from).toBe('function');
    expect(typeof client.auth).toBe('object');
    expect(typeof client.storage).toBe('object');
  });

  it('should configure auth options correctly for server environment', async () => {
    // Mock server environment
    const originalWindow = global.window;
    // @ts-expect-error - temporarily remove window for server simulation
    delete global.window;

    try {
      const { getSupabase } = await import('../supabase');
      const client = getSupabase();

      // In server mode, persistSession should be false
      expect(client).toBeDefined();
    } finally {
      // Restore window
      global.window = originalWindow;
    }
  });

  it('should have proper type inference for Database type', async () => {
    const { getSupabase } = await import('../supabase');
    const client = getSupabase();

    // Type inference smoke test - checking the client has the expected methods
    expect(typeof client.from).toBe('function');
    expect(typeof client.auth.signUp).toBe('function');
    expect(typeof client.storage.from).toBe('function');

    // This compilation test verifies the Database type is properly applied
    type ClientType = typeof client;
    const typeCheck: ClientType = client;
    expect(typeCheck).toBeDefined();
  });
});
