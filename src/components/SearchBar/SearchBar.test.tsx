import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchBarState } from 'src/utils/types';
import SearchBar from './SearchBar';
import homeReducer, { setSearchQuery } from '../../slices/homeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';

vi.mock('../../hooks/ReduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const mockHandleSubmit = vi.fn();

const createTestStore = () =>
  configureStore({
    reducer: {
      home: homeReducer,
    },
  });

describe('SearchBar component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: SearchBarState) => unknown) =>
        selector({
          home: {
            searchQuery: '',
          },
        })
    );
  });

  it('renders the SearchBar component with initial state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates local state on input change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search.../i);

    if (input instanceof HTMLInputElement) {
      fireEvent.change(input, { target: { value: 'Rick' } });
      expect(input.value).toBe('Rick');
    } else {
      throw new Error('Element is not an HTMLInputElement');
    }
  });

  it('dispatches search query and calls handleSubmit on form submission', () => {
    const dispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(dispatch).toHaveBeenCalledWith(setSearchQuery('Rick'));
    expect(mockHandleSubmit).toHaveBeenCalledWith('Rick');
  });

  it('trims the search query before dispatching and submitting', () => {
    const dispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '  Morty  ' } });
    fireEvent.click(searchButton);

    expect(dispatch).toHaveBeenCalledWith(setSearchQuery('Morty'));
    expect(mockHandleSubmit).toHaveBeenCalledWith('Morty');
  });
});
