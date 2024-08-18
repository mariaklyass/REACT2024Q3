import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TileData, TilesState } from '../../models/types';

const initialState: TilesState = {
  tiles: [],
};

const tilesSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    updateTiles(state, action: PayloadAction<TileData>) {
      state.tiles.push(action.payload);
    },
  },
});

export const { updateTiles } = tilesSlice.actions;
export default tilesSlice.reducer;
