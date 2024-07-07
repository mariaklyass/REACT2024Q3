import { Component, ChangeEvent, FormEvent } from 'react';
import { SearchBarProps, SearchBarState } from '../utils/types';
import './SearchBar.css';

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

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    const { handleSubmit } = this.props;
    handleSubmit(trimmedQuery);
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleChange}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
