import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeSlice, Character } from 'src/utils/types';

const initialState: HomeSlice = {
  searchQuery: '',
  currentPage: 1,
  characters: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      return { ...state, searchQuery: action.payload };
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload };
    },
    setCharacters(state, action: PayloadAction<Character[]>) {
      return { ...state, characters: action.payload };
    },
  },
});

export const { setSearchQuery, setCurrentPage, setCharacters } =
  homeSlice.actions;
export default homeSlice.reducer;
