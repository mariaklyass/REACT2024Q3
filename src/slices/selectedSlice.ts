import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, SelectedState } from 'src/utils/types';

const initialState: SelectedState = {
  selectedCharacters: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectCharacter(state, action: PayloadAction<Character>) {
      return {
        ...state,
        selectedCharacters: [...state.selectedCharacters, action.payload],
      };
    },
    unselectCharacter(state, action: PayloadAction<number>) {
      return {
        ...state,
        selectedCharacters: state.selectedCharacters.filter(
          item => item.id !== action.payload
        ),
      };
    },
    unselectAll(state) {
      return { ...state, selectedCharacters: [] };
    },
  },
});

export const { selectCharacter, unselectCharacter, unselectAll } =
  selectedSlice.actions;

export default selectedSlice.reducer;
