import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';

describe('Dialog Components', () => {
  it('renders DialogTrigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders DialogContent with close button by default', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getAllByText('Close')).toHaveLength(2); // Footer button and X button sr-only text
  });

  it('renders DialogContent without close button when showCloseButton is false', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Test Without Close</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Test Without Close')).toBeInTheDocument();
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('renders DialogHeader with correct styling', () => {
    render(
      <DialogHeader data-testid="dialog-header">
        <h2>Header Content</h2>
      </DialogHeader>
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'gap-2');
  });

  it('renders DialogFooter with correct styling', () => {
    render(
      <DialogFooter data-testid="dialog-footer">
        <button>Action</button>
      </DialogFooter>
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'flex-col-reverse', 'gap-2');
  });
});
