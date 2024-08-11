import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/lib/types';

export interface SelectedState {
  selectedCharacters: Character[];
}

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
    unselectCharacter(state, action: PayloadAction<string>) {
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
