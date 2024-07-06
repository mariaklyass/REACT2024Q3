import { Component } from 'react';
import CharacterCard from './CharacterCard';
import { SearchResultsProps, Character } from './types';

class SearchResults extends Component<SearchResultsProps, SearchResultsProps> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      results: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchResults(localStorage.getItem('searchQuery') || '');
  }

  fetchResults = (searchQuery: string) => {
    let url = `https://rickandmortyapi.com/api/character`;
    if (searchQuery) {
      url += `?name=${searchQuery}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<{ results: Character[] }>;
      })
      .then(data => {
        this.setState({ results: data.results, error: null });
      })
      .catch((error: Error) => {
        this.setState({ error });
      });
  };

  render() {
    const { results, error } = this.state;
    if (error) {
      return <div>Error loading results.</div>;
    }

    return (
      <div>
        {results.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default SearchResults;
