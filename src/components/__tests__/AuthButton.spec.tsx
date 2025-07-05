import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AuthButton from '../AuthButton';

// Mock the dependencies
vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => ({
    auth: {
      signOut: vi.fn().mockResolvedValue({}),
    },
  })),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useSession: vi.fn(),
}));

vi.mock('../SignInDialog', () => ({
  default: ({
    open,
    onOpenChange: _onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => <div data-testid="sign-in-dialog" data-open={open} />,
}));

describe('AuthButton', () => {
  const mockSignOut = vi.fn();
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
        signOut: mockSignOut,
      },
    } as unknown as ReturnType<typeof getSupabase>);
  });

  it('renders Sign In button when not authenticated', () => {
    mockUseSession.mockReturnValue(null);

    render(<AuthButton />);

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveClass('bg-pm-primary');
  });

  it('renders Sign Out button and email when authenticated', () => {
    const mockSession = {
      user: { email: 'test@example.com' },
    };
    mockUseSession.mockReturnValue(mockSession);

    render(<AuthButton />);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(screen.getByText('(test@example.com)')).toBeInTheDocument();
  });

  it('calls signOut when Sign Out button is clicked', async () => {
    const user = userEvent.setup();
    const mockSession = {
      user: { email: 'test@example.com' },
    };
    mockUseSession.mockReturnValue(mockSession);

    render(<AuthButton />);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    await user.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalledOnce();
  });

  it('opens SignInDialog when Sign In button is clicked', async () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue(null);

    render(<AuthButton />);

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(signInButton);

    const dialog = screen.getByTestId('sign-in-dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
  });

  it('matches snapshot when logged out', () => {
    mockUseSession.mockReturnValue(null);

    const { container } = render(<AuthButton />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot when logged in', () => {
    const mockSession = {
      user: { email: 'test@example.com' },
    };
    mockUseSession.mockReturnValue(mockSession);

    const { container } = render(<AuthButton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
