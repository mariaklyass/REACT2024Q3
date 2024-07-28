import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import homeReducer from './slices/homeSlice';
import selectedReducer from './slices/selectedSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    home: homeReducer,
    selected: selectedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
