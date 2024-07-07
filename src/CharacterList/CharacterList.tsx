import { Component, ReactNode } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import { CharacterListProps } from '../utils/types';
import './CharacterList.css';

class CharacterList extends Component<CharacterListProps> {
  render(): ReactNode {
    const { results, error } = this.props;

    if (error) {
      return (
        <div>
          There isn&apos;t a character with that name. <br />
          Would you mind trying something else?
        </div>
      );
    }

    if (results.length === 0) {
      return <div>No results found.</div>;
    }

    const searchResults = results.map(result => (
      <CharacterCard key={result.id} character={result} />
    ));

    return <div className="results">{searchResults}</div>;
  }
}

export default CharacterList;
