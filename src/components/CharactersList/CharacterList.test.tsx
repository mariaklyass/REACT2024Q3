import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CharactersList from './CharactersList';
import { Character } from '../../lib/types';
import { useAppSelector } from '../../store/hooks';
import selectedReducer, {
  selectCharacter,
  unselectAll,
  unselectCharacter,
} from '../../store/selectedSlice';
import { mockCharacters } from '../../utils/mocks';
import renderWithProviders from '../../tests/renderWithProviders';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('CharactersList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const characters: Character[] = mockCharacters;
  const initialState = {
    selectedCharacters: [] as Character[],
  };

  it('should render the correct number of characters', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    renderWithProviders(<CharactersList characters={characters} />);

    expect(screen.getAllByRole('checkbox')).toHaveLength(characters.length);
    expect(screen.getAllByRole('img')).toHaveLength(characters.length);
  });

  it('should handle initial state', () => {
    expect(selectedReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should select a character when a checkbox is clicked', () => {
    const character: Character = characters[0];
    const actual = selectedReducer(initialState, selectCharacter(character));
    expect(actual.selectedCharacters).toEqual([character]);
  });

  it('should handle unselectCharacter', () => {
    const character1: Character = mockCharacters[0];
    const character2: Character = mockCharacters[1];
    const stateWithCharacters = {
      selectedCharacters: [character1, character2],
    };
    const actual = selectedReducer(
      stateWithCharacters,
      unselectCharacter(character1.id)
    );
    expect(actual.selectedCharacters).toEqual([character2]);
  });

  it('should handle unselectAll', () => {
    const character: Character = mockCharacters[0];
    const stateWithCharacter = {
      selectedCharacters: [character],
    };
    const actual = selectedReducer(stateWithCharacter, unselectAll());
    expect(actual.selectedCharacters).toEqual([]);
  });
});
