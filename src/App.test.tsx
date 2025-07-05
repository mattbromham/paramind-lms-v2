import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders the bootstrap message', () => {
    render(<App />);

    const heading = screen.getByText('Paramind LMS bootstrap OK');
    expect(heading).toBeInTheDocument();
  });

  it('renders the Get Started button', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });
});
