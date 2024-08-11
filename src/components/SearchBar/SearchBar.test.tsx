import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('SearchBar Component', () => {
  it('should call router.push with the correct query on form submission', () => {
    const pushMock = vi.fn(() => Promise.resolve());
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Search characters');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Rick' } });

    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/?page=1&search=Rick');
  });
});
