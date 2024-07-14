import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCard from './CharacterCard';

test('CharacterCard renders correctly with mock data', () => {
  const character = {
    name: 'Rick Sanchez',
    status: 'Alive' as 'Alive' | 'Dead' | 'unknown',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

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
