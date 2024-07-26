import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  searchQuery: string;
  currentPage: number;
}

const initialState: HomeState = {
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
