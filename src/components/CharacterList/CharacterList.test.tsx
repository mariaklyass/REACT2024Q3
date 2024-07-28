import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MockState } from 'src/utils/types';
import { mockResults } from '../../utils/constants';
import CharacterList from './CharacterList';
import selectedReducer from '../../slices/selectedSlice';
import { useAppSelector } from '../../hooks/ReduxHooks';

vi.mock('../../hooks/ReduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });

describe('HomePage', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: MockState) => unknown) =>
        selector({
          selected: {
            selectedCharacters: [],
          },
        } as MockState)
    );
  });

  it('verifies there is a specified number of characters initially rendered on the Home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CharacterList results={mockResults} error={null} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );
    const cards = screen.getAllByTestId('card-element');
    expect(cards.length).toBe(mockResults.length);
  });

  it('displays an error message if no cards are present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CharacterList results={[]} error={null} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByTestId('error-message');
    expect(heading).toBeInTheDocument();
  });
});
