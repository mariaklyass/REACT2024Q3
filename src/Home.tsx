import { Component } from 'react';
import SearchBar from './SearchBar';
import { HomeState, ApiResponse } from './types';
import CharacterList from './CharacterList';

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

    await this.fetchResults(searchQuery);
  }

  fetchResults = async (searchQuery: string) => {
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
      this.setState({ results: data.results, error: null });
    } catch (error) {
      if (error instanceof Error) this.setState({ error });
    }
  };

  handleFetchResults = (searchQuery: string) => {
    this.fetchResults(searchQuery).catch(error => {
      if (error instanceof Error) this.setState({ error });
    });
  };

  render() {
    const { results, error } = this.state;
    if (error) {
      return <div>Error loading results.</div>;
    }

    return (
      <div>
        <SearchBar handleSubmit={this.handleFetchResults} />
        <CharacterList results={results} error={error} />
      </div>
    );
  }
}
