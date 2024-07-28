import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, ApiResponse, FetchCharactersParams } from '../utils/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: builder => ({
    fetchCharacters: builder.query<ApiResponse, FetchCharactersParams>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
    }),
    fetchCharacterById: builder.query<Character, string>({
      query: id => `character/${id}`,
    }),
  }),
});

export const { useFetchCharactersQuery, useFetchCharacterByIdQuery } = apiSlice;
