import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Character } from 'src/utils/types';
import { vi } from 'vitest';
import Home from './Home';
import { useFetchCharactersQuery } from '../../slices/apiSlice';
import homeReducer from '../../slices/homeSlice';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
];

vi.mock('../../slices/apiSlice', () => ({
  useFetchCharactersQuery: vi.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      home: homeReducer,
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
      data: { results: mockCharacters, info: { pages: 1 } },
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

    expect(screen.getByText(/All Characters/i)).toBeInTheDocument();
  });

  it('handles search query submission', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: mockCharacters, info: { pages: 1 } },
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
      data: { results: mockCharacters, info: { pages: 2 } },
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

  // it('updates URL parameters based on pagination changes', () => {
  //   (useFetchCharactersQuery as jest.Mock).mockReturnValue({
  //     data: { results: [], info: { pages: 2 } },
  //     isLoading: false,
  //     error: null,
  //   });

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/']}>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //         </Routes>
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const nextPageButton = screen.getByRole('button', { name: /next/i });

  //   fireEvent.click(nextPageButton);

  //   expect(window.location.search).toContain('page=2');
  // });

  it('displays loader during data fetching', () => {
    (useFetchCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
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
      isLoading: false,
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
