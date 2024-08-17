'use client';

import { useRouter } from 'next/navigation';

function SearchBar(): JSX.Element {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).elements.namedItem(
      'search'
    ) as HTMLInputElement;
    const searchTerm = query.value.trim();
    if (searchTerm) {
      router.push(`/?page=1&search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} data-testid="form">
      <input type="text" name="search" placeholder="Search characters" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
