import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { vi } from 'vitest';
import { mockResults } from '../../utils/constants';
import Home from './Home';
import { useFetchCharactersQuery } from '../../slices/apiSlice';
import homeReducer from '../../slices/homeSlice';
import selectedReducer from '../../slices/selectedSlice';

vi.mock('../../slices/apiSlice', () => ({
  useFetchCharactersQuery: vi.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      home: homeReducer,
      selected: selectedReducer,
    },
  });

describe('Home component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  it('renders the Home component with initial state', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: mockResults, info: { pages: 1 } },
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/All Characters/i)).toBeInTheDocument();
  });

  it('handles search query submission', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: mockResults, info: { pages: 1 } },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const searchBar = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchBar, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    const actions = store.getState().home;
    expect(actions.searchQuery).toBe('Rick');
    expect(actions.currentPage).toBe(1);
  });

  it('handles pagination changes', async () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: mockResults, info: { pages: 2 } },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?frontpage=1']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText('All Characters')).toBeInTheDocument()
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    await waitFor(() =>
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
    );
  });

  it('displays loader during data fetching', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: 'API Error',
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByTestId('error-message');
    expect(heading).toBeInTheDocument();
  });
});
