import { Component } from 'react';
import { CharacterCardProps } from './types';

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    const { character } = this.props;
    const { name, status, species, image } = character;
    return (
      <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>
          {status} - {species}
        </p>
      </div>
    );
  }
}

export default CharacterCard;
