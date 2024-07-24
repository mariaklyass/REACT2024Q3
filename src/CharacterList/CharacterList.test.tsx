import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CharacterList from './CharacterList';
import { Character } from '../utils/types';

describe('HomePage', () => {
  const mockResults: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    },
  ];

  it('verifies there is a specified number of characters initially rendered on the Home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterList results={mockResults} error={null} currentPage={1} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('card-element');
    expect(cards.length).toBe(mockResults.length);
  });

  it('displays an error message if no cards are present', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterList results={[]} error={null} currentPage={1} />
      </MemoryRouter>
    );
    const heading = screen.getByTestId('error-message');
    expect(heading).toBeInTheDocument();
  });
});
