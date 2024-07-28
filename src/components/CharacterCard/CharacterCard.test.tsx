import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter } from '../../utils/constants';
import CharacterCard from './CharacterCard';
import CharacterCardDetails from '../CharacterCardDetails/CharacterCardDetails';
import homeReducer from '../../slices/homeSlice';
import { useFetchCharacterByIdQuery } from '../../slices/apiSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      home: homeReducer,
    },
  });

vi.mock('../../slices/apiSlice', () => ({
  useFetchCharacterByIdQuery: vi.fn(),
}));

describe('Card Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  it('CharacterCard renders correctly with mock data', () => {
    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter} />
      </Provider>
    );

    expect(screen.getByTestId('card-element')).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      'src',
      mockCharacter.image
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      mockCharacter.name
    );
    expect(
      screen.getByText(`${mockCharacter.status} - ${mockCharacter.species}`)
    ).toBeInTheDocument();
  });

  it('validates that clicking on a card opens a detailed card component', () => {
    (useFetchCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacter,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CharacterCard character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('card-element'));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <CharacterCardDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      mockCharacter.name
    );
  });
});
