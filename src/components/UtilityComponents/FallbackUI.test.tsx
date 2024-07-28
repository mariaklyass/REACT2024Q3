import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FallbackUI from './FallbackUI';

describe('FallbackUI Component', () => {
  it('renders the fallback message correctly', () => {
    render(<FallbackUI />);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();

    expect(
      screen.getByText('We apologize for the inconvenience.')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Please try refreshing the page or return to the main page.'
      )
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Go to the Main Page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
