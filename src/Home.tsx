import { Component } from 'react';
import SearchBar from './SearchBar';
import { HomeState } from './utils/types';
import CharacterList from './CharacterList';
import Loader from './Loader';
import fetchCharacterData from './utils/api';

export default class Home extends Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      error: null,
      loading: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ loading: true });

    try {
      const results = await fetchCharacterData(searchQuery);
      this.setState({ results, error: null, loading: false });
    } catch (error) {
      if (error instanceof Error) this.setState({ error, loading: false });
    }
  }

  handleFetchResults = (searchQuery: string) => {
    this.setState({ loading: true });
    fetchCharacterData(searchQuery)
      .then(results => {
        this.setState({ results, error: null, loading: false });
      })
      .catch(error => {
        if (error instanceof Error) {
          this.setState({ error, loading: false });
        }
      });
  };

  render() {
    const { results, error, loading } = this.state;
    return (
      <div>
        <SearchBar handleSubmit={this.handleFetchResults} />
        {loading ? (
          <Loader /> // Render the loader when loading
        ) : (
          <CharacterList results={results} error={error} />
        )}
      </div>
    );
  }
}
