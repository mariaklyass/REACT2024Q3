import { ApiResponse } from './types';

const fetchCharacterData = async (
  searchQuery: string
): Promise<ApiResponse['results']> => {
  let url = `https://rickandmortyapi.com/api/character`;
  if (searchQuery) {
    url += `?name=${searchQuery}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
};

export default fetchCharacterData;
