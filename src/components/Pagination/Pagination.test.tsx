import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import Pagination from './Pagination';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('ensures Previous button is disabled on the first page', () => {
    render(<Pagination currentPage={1} total={5} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('ensures Next button is disabled on the last page', () => {
    render(<Pagination currentPage={5} total={5} />);

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('ensures page number is correctly displayed', () => {
    render(<Pagination currentPage={3} total={5} />);

    expect(screen.getByText('Page 3 out of 5')).toBeInTheDocument();
  });
});
