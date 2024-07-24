import { it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import CharacterCardDetails from '../CharacterCardDetails/CharacterCardDetails';

describe('Card Component', () => {
  const character = {
    name: 'Rick Sanchez',
    status: 'Alive' as 'Alive' | 'Dead' | 'unknown',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  it('CharacterCard renders correctly with mock data', () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByTestId('card-element')).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toHaveAttribute(
      'src',
      character.image
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      character.name
    );
    expect(
      screen.getByText(`${character.status} - ${character.species}`)
    ).toBeInTheDocument();
  });

  it('validates that clicking on a card opens a detailed card component', () => {
    render(<CharacterCard character={character} />);
    fireEvent.click(screen.getByTestId('card-element'));
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCardDetails />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      character.name
    );
  });
});
