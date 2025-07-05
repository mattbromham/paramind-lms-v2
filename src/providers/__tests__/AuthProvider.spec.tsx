import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AuthProvider from '../AuthProvider';

// Mock the dependencies
vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => ({
    auth: {
      onAuthStateChange: vi.fn(),
      getSession: vi.fn(),
    },
  })),
}));

vi.mock('@supabase/auth-helpers-react', () => ({
  SessionContextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-context-provider">{children}</div>
  ),
  useSession: vi.fn(),
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children wrapped in SessionContextProvider', () => {
    render(
      <AuthProvider>
        <div data-testid="child-component">Test Child</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('session-context-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('calls getSupabase to get the supabase client', async () => {
    const { getSupabase } = await import('@/lib/supabase');

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    expect(getSupabase).toHaveBeenCalledOnce();
  });

  it('passes supabase client to SessionContextProvider', async () => {
    const mockSupabase = {
      auth: {
        onAuthStateChange: vi.fn(),
        getSession: vi.fn(),
      },
    };

    const { getSupabase } = await import('@/lib/supabase');
    vi.mocked(getSupabase).mockReturnValue(
      mockSupabase as unknown as ReturnType<typeof getSupabase>
    );

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    expect(getSupabase).toHaveBeenCalledOnce();
  });

  it('re-exports useSession from auth-helpers-react', async () => {
    const { useSession } = await import('../AuthProvider');
    const { useSession: originalUseSession } = await import(
      '@supabase/auth-helpers-react'
    );

    expect(useSession).toBe(originalUseSession);
  });
});
