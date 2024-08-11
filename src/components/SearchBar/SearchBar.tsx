import { useRouter } from 'next/router';

function SearchBar(): JSX.Element {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).elements.namedItem(
      'search'
    ) as HTMLInputElement;
    router.push(`/?page=1&search=${query.value}`).catch(error => {
      console.error('Failed to navigate:', error);
    });
  };

  return (
    <form onSubmit={handleSearch} data-testid="form">
      <input type="text" name="search" placeholder="Search characters" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
