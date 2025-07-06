import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Navbar/Logo';
import { Navbar } from '@/components/Navbar/Navbar';
import { ThemeToggle } from '@/components/Navbar/ThemeToggle';
import AppLayout from '@/layouts/AppLayout';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'system',
    setTheme: vi.fn(),
    resolvedTheme: 'dark',
    systemPreference: 'dark',
    isDayTheme: false,
    isNightTheme: true,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {component}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('AppLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the layout with navbar, main content, and footer', () => {
    renderWithRouter(<AppLayout />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header/navbar
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('renders skip link with correct href', () => {
    renderWithRouter(<AppLayout />);
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main');
  });

  it('has correct main element id', () => {
    renderWithRouter(<AppLayout />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main');
  });
});

describe('Logo', () => {
  it('renders logo with correct link to home', () => {
    renderWithRouter(<Logo />);
    
    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(screen.getByText('Paramind')).toBeInTheDocument();
    expect(screen.getByText('LMS')).toBeInTheDocument();
  });
});

describe('Navbar', () => {
  it('renders navigation links on desktop', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Ask a Tutor')).toBeInTheDocument();
  });

  it('navigation links have proper spacing', () => {
    renderWithRouter(<Navbar />);
    
    const navList = screen.getByRole('list');
    expect(navList).toHaveClass('gap-4');
    expect(navList).toHaveClass('list-none');
  });

  it('desktop navigation links are visible at large viewport', () => {
    // Mock viewport width for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
    // Trigger resize event to simulate viewport change
    window.dispatchEvent(new Event('resize'));

    renderWithRouter(<Navbar />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const reviewsLink = screen.getByRole('link', { name: /reviews/i });
    const askTutorButton = screen.getByRole('link', { name: /ask a tutor/i });
    
    // Check that elements are in DOM and don't have 'hidden' class
    expect(dashboardLink).toBeInTheDocument();
    expect(reviewsLink).toBeInTheDocument();
    expect(askTutorButton).toBeInTheDocument();
    
    // Check that the navigation container has lg:flex class to show it on desktop
    const navContainer = dashboardLink.closest('nav');
    expect(navContainer).toHaveClass('lg:flex');
    expect(navContainer).toHaveClass('hidden');
    
    // Check that the right section container has lg:flex class to show it on desktop
    const rightSection = askTutorButton.closest('div');
    expect(rightSection).toHaveClass('lg:flex');
    expect(rightSection).toHaveClass('hidden');
    
    // Mobile menu button should have lg:hidden class to hide it on desktop
    const mobileMenuButton = screen.getByLabelText('Open menu');
    const mobileMenuContainer = mobileMenuButton.closest('div');
    expect(mobileMenuContainer).toHaveClass('lg:hidden');
  });

  it('mobile menu button is visible on small screens and desktop nav is hidden', () => {
    // Mock viewport width for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    // Trigger resize event to simulate viewport change
    window.dispatchEvent(new Event('resize'));

    renderWithRouter(<Navbar />);
    
    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();
    
    // Desktop navigation links should still be in DOM but have hidden class (and lg:flex)
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const navContainer = dashboardLink.closest('nav');
    expect(navContainer).toHaveClass('hidden');
    expect(navContainer).toHaveClass('lg:flex');
    
    // Mobile menu button container should have lg:hidden class
    const mobileMenuContainer = mobileMenuButton.closest('div');
    expect(mobileMenuContainer).toHaveClass('lg:hidden');
  });

  it('renders theme toggle buttons (desktop and mobile)', () => {
    renderWithRouter(<Navbar />);
    
    const themeToggles = screen.getAllByLabelText('Toggle theme');
    expect(themeToggles).toHaveLength(2); // Desktop and mobile versions
  });

  it('renders profile avatar with dropdown', () => {
    renderWithRouter(<Navbar />);
    
    const profileButton = screen.getByLabelText('User menu');
    expect(profileButton).toBeInTheDocument();
  });

  it('renders mobile menu button on small screens', () => {
    renderWithRouter(<Navbar />);
    
    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('highlights active route', () => {
    renderWithRouter(<Navbar />, ['/review']);
    
    const reviewLink = screen.getByText('Reviews');
    expect(reviewLink).toHaveClass('text-primary');
  });
});

describe('Footer', () => {
  it('renders copyright with current year', () => {
    renderWithRouter(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© Paramind LMS ${currentYear}`)).toBeInTheDocument();
  });

  it('renders privacy and terms links with separator', () => {
    renderWithRouter(<Footer />);
    
    const privacyLink = screen.getByText('Privacy');
    const termsLink = screen.getByText('Terms');
    const separator = screen.getByText('·');
    
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');
    expect(separator).toBeInTheDocument();
    
    // Verify the separator is properly styled
    expect(separator).toHaveClass('text-text-low');
  });

  it('renders git commit hash when available', () => {
    // Mock the environment variable
    const originalEnv = import.meta.env.VITE_GIT_SHA;
    import.meta.env.VITE_GIT_SHA = 'abc123def456';
    
    renderWithRouter(<Footer />);
    
    expect(screen.getByText('abc123d')).toBeInTheDocument();
    
    // Restore original
    import.meta.env.VITE_GIT_SHA = originalEnv;
  });
});

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    renderWithRouter(<ThemeToggle />);
    
    const toggleButton = screen.getByLabelText('Toggle theme');
    expect(toggleButton).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithRouter(<ThemeToggle />);
    
    const toggleButton = screen.getByLabelText('Toggle theme');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'menu');
    expect(toggleButton).toHaveAttribute('type', 'button');
  });
}); 