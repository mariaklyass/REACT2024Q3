import { Component, ChangeEvent } from 'react';
import { SearchBarProps, SearchBarState } from './types';

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ searchQuery: value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    const { onSearch } = this.props;
    onSearch(trimmedQuery);
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
