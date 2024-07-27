import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeSlice } from 'src/utils/types';

const initialState: HomeSlice = {
  searchQuery: '',
  currentPage: 1,
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
  },
});

export const { setSearchQuery, setCurrentPage } = homeSlice.actions;
export default homeSlice.reducer;
