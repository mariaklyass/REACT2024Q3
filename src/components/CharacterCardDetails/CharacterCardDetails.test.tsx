import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { mockResults } from '../../utils/constants';
import CharacterCardDetails from './CharacterCardDetails';
import { useFetchCharacterByIdQuery } from '../../slices/apiSlice';
import homeReducer from '../../slices/homeSlice';

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
      data: mockResults[0],
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
      data: mockResults[0],
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
      data: mockResults[0],
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
