import { Suspense } from 'react';
import baseUrl from 'src/utils/constants';
import { ApiResponse, Character } from 'src/lib/types';
import Flyout from 'src/components/Flyout/Flyout';
import CharactersList from '../components/CharactersList/CharactersList';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';
import Pagination from '../components/Pagination/Pagination';

async function fetchCharacters(
  page: string,
  search?: string
): Promise<{ characters: Character[]; totalPages: number }> {
  try {
    let searchQuery = '';
    if (search) {
      searchQuery = `&name=${search}`;
    }

    const res = await fetch(`${baseUrl}/?page=${page}${searchQuery}`);
    if (!res.ok) throw new Error('Failed to fetch characters');

    const data = (await res.json()) as ApiResponse;
    const totalPages = data.info?.pages || 1;
    return { characters: data.results, totalPages };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { characters: [], totalPages: 1 };
  }
}

async function fetchCharacterDetails(id: string): Promise<Character | null> {
  try {
    const res = await fetch(`${baseUrl}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch character details');

    const character = (await res.json()) as Character;
    return character;
  } catch (error) {
    console.error('Error fetching character details:', error);
    return null;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; details?: string };
}) {
  const { page = '1', search, details } = searchParams;
  const { characters, totalPages } = await fetchCharacters(page, search);
  let characterDetails: Character | null = null;

  if (details) {
    characterDetails = await fetchCharacterDetails(details);
  }

  return (
    <>
      <div className="main-page">
        <Suspense fallback={<div>Loading...</div>}>
          <CharactersList characters={characters} />
        </Suspense>

        {characterDetails && (
          <Suspense fallback={<div>Loading...</div>}>
            <div className="details">
              <CharacterDetails character={characterDetails} />
            </div>
          </Suspense>
        )}
      </div>
      <div className="pagination">
        <Pagination
          currentPage={parseInt(page, 10)}
          total={totalPages}
          search={search}
          details={details}
        />
      </div>
      <Flyout />
    </>
  );
}
