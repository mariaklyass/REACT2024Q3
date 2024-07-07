import { Component, ReactNode } from 'react';
import CharacterCard from './CharacterCard';
import { CharacterListProps } from './utils/types';

class CharacterList extends Component<CharacterListProps> {
  render(): ReactNode {
    const { results, error } = this.props;

    if (error) {
      return <div>Error loading results.</div>;
    }

    if (results.length === 0) {
      return <div>No results found.</div>;
    }

    const searchResults = results.map(result => (
      <CharacterCard key={result.id} character={result} />
    ));

    return <div>{searchResults}</div>;
  }
}

export default CharacterList;
