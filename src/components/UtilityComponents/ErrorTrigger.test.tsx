import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorTrigger from './ErrorTrigger';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorTrigger Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggers an error when the button is clicked', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ErrorTrigger />
      </ErrorBoundary>
    );

    const button = screen.getByText('Trigger Button');

    fireEvent.click(button);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });
});
