import { Component } from 'react';
import SearchBar from './SearchBar';
import { HomeState } from './types';
import CharacterList from './CharacterList';
import fetchCharacterData from './utils/api';

export default class Home extends Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      error: null,
    };
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = localStorage.getItem('searchQuery') || '';

    try {
      const results = await fetchCharacterData(searchQuery);
      this.setState({ results, error: null });
    } catch (error) {
      if (error instanceof Error) this.setState({ error });
    }
  }

  handleFetchResults = (searchQuery: string) => {
    fetchCharacterData(searchQuery)
      .then(results => {
        this.setState({ results, error: null });
      })
      .catch(error => {
        if (error instanceof Error) {
          this.setState({ error });
        }
      });
  };

  render() {
    const { results, error } = this.state;
    return (
      <div>
        <SearchBar handleSubmit={this.handleFetchResults} />
        <CharacterList results={results} error={error} />
      </div>
    );
  }
}
