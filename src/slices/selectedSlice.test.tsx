import { describe, it, expect } from 'vitest';
import selectedReducer, {
  selectCharacter,
  unselectCharacter,
  unselectAll,
} from './selectedSlice';
import { Character } from '../utils/types';
import { mockResults } from '../utils/constants';

describe('selectedSlice', () => {
  const initialState = {
    selectedCharacters: [] as Character[],
  };

  it('should handle initial state', () => {
    expect(selectedReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle selectCharacter', () => {
    const character: Character = mockResults[0];
    const actual = selectedReducer(initialState, selectCharacter(character));
    expect(actual.selectedCharacters).toEqual([character]);
  });

  it('should handle unselectCharacter', () => {
    const character1: Character = mockResults[0];
    const character2: Character = mockResults[1];
    const stateWithCharacters = {
      selectedCharacters: [character1, character2],
    };
    const actual = selectedReducer(stateWithCharacters, unselectCharacter(1));
    expect(actual.selectedCharacters).toEqual([character2]);
  });

  it('should handle unselectAll', () => {
    const character: Character = mockResults[0];
    const stateWithCharacter = {
      selectedCharacters: [character],
    };
    const actual = selectedReducer(stateWithCharacter, unselectAll());
    expect(actual.selectedCharacters).toEqual([]);
  });
});
