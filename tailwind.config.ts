import type { Config } from 'tailwindcss';

const withOpacity =
  (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue !== undefined
      ? `rgb(var(${variable}) / ${opacityValue})`
      : `rgb(var(${variable}))`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: withOpacity('--pm-bg'),
        surface: withOpacity('--pm-surface'),
        primary: withOpacity('--pm-primary'),
        'primary-foreground': withOpacity('--pm-primary-foreground'),
        secondary: withOpacity('--pm-secondary'),
        border: withOpacity('--pm-border'),
        text: {
          high: withOpacity('--pm-text-high'),
          low: withOpacity('--pm-text-low'),
        },
      },
      borderRadius: { card: '20px' }, // matches 20 px radius spec
      boxShadow: { card: '0 6px 24px rgba(0,0,0,.12)' },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        'lg': '1024px',
      },
    },
  },
  plugins: [],
} satisfies Config;
