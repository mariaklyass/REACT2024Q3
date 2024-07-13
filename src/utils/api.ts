import axios from 'axios';
import { ApiResponse, Character } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const fetchCharacterData = async (
  searchQuery: string
): Promise<Character[]> => {
  const response = await axios.get<ApiResponse>(BASE_URL, {
    params: searchQuery ? { name: searchQuery } : {},
  });
  return response.data.results;
};

export default fetchCharacterData;
