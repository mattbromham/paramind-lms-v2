import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Menu, MessageCircle, Settings, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className="flex items-center h-16 px-4 border-b border-border/20 backdrop-blur bg-surface/95 sticky top-0 z-50">
      <div className="flex items-center flex-1">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex ml-8">
          <ul className="flex items-center gap-4 lg:gap-6 list-none p-0 m-0">
            <li>
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActiveRoute('/') 
                    ? 'text-primary font-semibold' 
                    : 'text-text-high hover:text-primary'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/review"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActiveRoute('/review') 
                    ? 'text-primary font-semibold' 
                    : 'text-text-high hover:text-primary'
                }`}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden lg:flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="ml-6 lg:ml-8">
          <Link to="/ask" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Ask a Tutor</span>
          </Link>
        </Button>

        <ThemeToggle />

        {/* Profile Avatar Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="User menu"
            >
              <User className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[200px] rounded-md border border-border bg-surface p-1 shadow-lg"
              align="end"
              sideOffset={5}
            >
              <DropdownMenu.Item asChild>
                <Link
                  to="/settings"
                  className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-text-high hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-text-high hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex lg:hidden items-center space-x-2">
        <ThemeToggle />
        <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex items-center justify-center h-8 w-8 rounded-md text-text-high hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Content className="fixed top-0 right-0 h-full w-72 bg-surface border-l border-border z-50 p-6">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-text-high">
                  Menu
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="flex items-center justify-center h-8 w-8 rounded-md text-text-high hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="space-y-4">
                <Link
                  to="/"
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveRoute('/') 
                      ? 'text-primary font-semibold' 
                      : 'text-text-high hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/review"
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveRoute('/review') 
                      ? 'text-primary font-semibold' 
                      : 'text-text-high hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
                <Link
                  to="/ask"
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-high hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask a Tutor</span>
                </Link>
                <div className="pt-4 border-t border-border">
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-high hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-high hover:text-primary transition-colors w-full text-left">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
} 