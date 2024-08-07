import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ApiResponse, Character, MainPageProps } from 'src/lib/types';
import Pagination from 'src/components/Pagination/Pagination';
import CharacterDetails from 'src/components/CharacterDetails/CharacterDetails';
import CharactersList from 'src/components/CharactersList/CharactersList';
import baseUrl from 'src/utils/constants';

export default function MainPage({
  characters,
  info,
  detailsData,
}: MainPageProps) {
  const router = useRouter();
  const { page = '1', search, details } = router.query;
  const currentPage = parseInt(page as string, 10);

  const handleCharacterClick = (id: string) => {
    const query = {
      page,
      details: id,
      ...(search && { search }),
    };
    router.push({ pathname: '/', query }).catch(error => {
      console.error('Failed to navigate:', error);
    });
  };

  return (
    <div className="main">
      <div className="main-page">
        <CharactersList
          characters={characters}
          onCharacterClick={handleCharacterClick}
        />
        {detailsData && <CharacterDetails character={detailsData} />}
      </div>
      <Pagination
        currentPage={currentPage}
        total={info.pages}
        search={search as string}
        details={details as string}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { page = '1', search, details } = context.query;
  const pageNumber = parseInt(page as string, 10);
  let searchQuery = '';
  if (Array.isArray(search)) {
    searchQuery = `&name=${search[0]}`;
  } else if (search) {
    searchQuery = `&name=${search}`;
  }

  const res = await fetch(`${baseUrl}/?page=${pageNumber}${searchQuery}`);
  const data: ApiResponse = (await res.json()) as ApiResponse;

  let detailsData: Character | null = null;
  if (details && typeof details === 'string') {
    const detailsRes = await fetch(`${baseUrl}/${details}`);
    detailsData = (await detailsRes.json()) as Character;
  }

  return {
    props: {
      characters: data.results,
      info: data.info,
      detailsData,
    },
  };
};
