import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Character } from 'src/utils/types';
import CharacterCardDetails from './CharacterCardDetails';
import { useFetchCharacterByIdQuery } from '../../slices/apiSlice';
import homeReducer from '../../slices/homeSlice';

const mockCharacter: Character = {
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
};

vi.mock('../../slices/apiSlice', () => ({
  useFetchCharacterByIdQuery: vi.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      home: homeReducer,
    },
  });

describe('CharacterCardDetails component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  it('renders the CharacterCardDetails component with initial state', () => {
    (useFetchCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacter,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<CharacterCardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('handles closing the character card', () => {
    (useFetchCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacter,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<CharacterCardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    expect(window.location.search).not.toContain('details=1');
  });

  it('displays loader during data fetching', () => {
    (useFetchCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<CharacterCardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('handles click outside to close the card', () => {
    (useFetchCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacter,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<CharacterCardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.mouseDown(document);
    expect(window.location.search).not.toContain('details=1');
  });
});
