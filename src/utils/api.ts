import axios from 'axios';
import { ApiResponse, Character } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const fetchCharacterData = async (
  searchQuery: string,
  page: number = 1
): Promise<{ results: Character[]; totalPages: number }> => {
  const response = await axios.get<ApiResponse>(BASE_URL, {
    params: {
      name: searchQuery || undefined,
      page,
    },
  });
  const { results, info } = response.data;
  return {
    results,
    totalPages: info.pages,
  };
};

export default fetchCharacterData;
