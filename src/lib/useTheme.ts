import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'night' | 'day'>('night');

  // Apply theme to HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'day') {
      html.setAttribute('data-theme', 'day');
    } else {
      html.removeAttribute('data-theme');
    }
  }, [theme]);

  // Handle Shift+D keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setTheme((current) => (current === 'night' ? 'day' : 'night'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'night' ? 'day' : 'night'));
  };

  return {
    theme,
    toggleTheme,
    isDayTheme: theme === 'day',
    isNightTheme: theme === 'night',
  };
};
