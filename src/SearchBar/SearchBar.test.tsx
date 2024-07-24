import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import useLocalStorage from '../hooks/useLocalStorage';

vi.mock('../hooks/useLocalStorage', () => ({
  default: vi.fn(),
}));

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saves the entered value to the local storage when the Search button is clicked', () => {
    let mockValue = '';
    const setItemMock = vi.fn((newValue: string) => {
      mockValue = newValue;
    });
    (useLocalStorage as jest.Mock).mockReturnValue([mockValue, setItemMock]);

    const handleSubmit = vi.fn();
    const { rerender } = render(<SearchBar handleSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });
    (useLocalStorage as jest.Mock).mockReturnValue(['test query', setItemMock]);
    rerender(<SearchBar handleSubmit={handleSubmit} />);

    fireEvent.click(searchButton);

    expect(setItemMock).toHaveBeenCalledWith('test query');
    expect(handleSubmit).toHaveBeenCalledWith('test query');
  });

  it('retrieves the value from the local storage upon mounting', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['saved query', vi.fn()]);

    const handleSubmit = vi.fn();
    render(<SearchBar handleSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('saved query');
  });
});
