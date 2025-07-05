import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SignInDialog from '../SignInDialog';

// Mock the dependencies
vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => ({
    auth: {
      onAuthStateChange: vi.fn(),
      getSession: vi.fn(),
    },
  })),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useSession: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock('@supabase/auth-ui-react', () => ({
  Auth: ({
    providers,
    view,
    showLinks,
    redirectTo,
  }: {
    providers: string[];
    view: string;
    showLinks: boolean;
    redirectTo: string;
  }) => (
    <div data-testid="auth-component">
      <div data-testid="auth-props">
        {JSON.stringify({ providers, view, showLinks, redirectTo })}
      </div>
    </div>
  ),
}));

vi.mock('@supabase/auth-ui-shared', () => ({
  ThemeSupa: { name: 'ThemeSupa' },
}));

describe('SignInDialog', () => {
  const mockOnOpenChange = vi.fn();
  const mockUseSession = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock useSession
    const { useSession } = await import('@/providers/AuthProvider');
    vi.mocked(useSession).mockImplementation(mockUseSession);

    // Mock getSupabase
    const { getSupabase } = await import('@/lib/supabase');
    vi.mocked(getSupabase).mockReturnValue({
      auth: {
        onAuthStateChange: vi.fn(),
        getSession: vi.fn(),
      },
    } as unknown as ReturnType<typeof getSupabase>);
  });

  it('renders dialog with correct title', () => {
    mockUseSession.mockReturnValue(null);

    render(<SignInDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText('Sign in to Paramind LMS')).toBeInTheDocument();
  });

  it('renders Auth component with correct props', () => {
    mockUseSession.mockReturnValue(null);

    render(<SignInDialog open={true} onOpenChange={mockOnOpenChange} />);

    const authComponent = screen.getByTestId('auth-component');
    expect(authComponent).toBeInTheDocument();

    const authProps = screen.getByTestId('auth-props');
    const props = JSON.parse(authProps.textContent || '{}');
    expect(props.providers).toEqual(['google']);
    expect(props.view).toBe('sign_in');
    expect(props.showLinks).toBe(false);
    expect(props.redirectTo).toBe(window.location.origin);
  });

  it('closes dialog and shows success toast when user signs in', async () => {
    const { toast } = await import('sonner');

    // First render without session
    mockUseSession.mockReturnValue(null);
    const { rerender } = render(
      <SignInDialog open={true} onOpenChange={mockOnOpenChange} />
    );

    // Then simulate user signing in
    const mockSession = {
      user: { email: 'test@example.com' },
    };
    mockUseSession.mockReturnValue(mockSession);

    rerender(<SignInDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(toast.success).toHaveBeenCalledWith('Signed in successfully');
  });

  it('calls getSupabase to get supabase client', async () => {
    const { getSupabase } = await import('@/lib/supabase');
    mockUseSession.mockReturnValue(null);

    render(<SignInDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(getSupabase).toHaveBeenCalledOnce();
  });

  it('does not close dialog when no session is present', () => {
    mockUseSession.mockReturnValue(null);

    render(<SignInDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(mockOnOpenChange).not.toHaveBeenCalled();
  });
});
