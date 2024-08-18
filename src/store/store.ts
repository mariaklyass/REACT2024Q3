import { configureStore } from '@reduxjs/toolkit';
import tilesReducer from '../store/slices/tilesSlice';
import countriesReducer from './slices/countriesSlice';

const store = configureStore({
  reducer: {
    tiles: tilesReducer,
    countries: countriesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
