import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders the bootstrap message', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Paramind LMS bootstrap OK');
  });

  it('renders the Get Started button', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });
});
