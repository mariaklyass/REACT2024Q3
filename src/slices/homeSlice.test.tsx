import { describe, it, expect } from 'vitest';
import homeReducer, {
  setSearchQuery,
  setCurrentPage,
  setCharacters,
} from './homeSlice';
import { Character } from '../utils/types';
import { mockResults } from '../utils/constants';

describe('homeSlice', () => {
  const initialState = {
    searchQuery: '',
    currentPage: 1,
    characters: [] as Character[],
  };

  it('should handle initial state', () => {
    expect(homeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearchQuery', () => {
    const actual = homeReducer(initialState, setSearchQuery('Rick'));
    expect(actual.searchQuery).toEqual('Rick');
  });

  it('should handle setCurrentPage', () => {
    const actual = homeReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it('should handle setCharacters', () => {
    const characters: Character[] = mockResults;
    const actual = homeReducer(initialState, setCharacters(characters));
    expect(actual.characters).toEqual(characters);
  });
});
