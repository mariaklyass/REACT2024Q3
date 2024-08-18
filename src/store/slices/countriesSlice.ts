import { countries } from '../../models/countries';
import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export default countriesSlice.reducer;
