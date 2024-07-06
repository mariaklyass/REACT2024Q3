import { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;
