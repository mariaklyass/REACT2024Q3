import { it, describe, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterCardDetails from './CharacterCardDetails';
import { fetchCharacterDataById } from '../utils/api';
import { Character } from '../utils/types';

type FetchCharacterDataById = (id: string) => Promise<Character>;

vi.mock('../utils/api', () => ({
  fetchCharacterDataById: vi.fn() as FetchCharacterDataById,
}));

vi.mock('../UtilityComponents/Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

vi.mock('../UtilityComponents/FallbackUI', () => ({
  __esModule: true,
  default: () => <div>Error loading data</div>,
}));

describe('Detailed Card Component', () => {
  const mockCharacter = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('checks that a loading indicator is displayed while fetching data', () => {
    (fetchCharacterDataById as jest.Mock).mockResolvedValueOnce(
      new Promise(() => {})
    );

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CharacterCardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('makes sure the detailed card component correctly displays the detailed card data', async () => {
    (fetchCharacterDataById as jest.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CharacterCardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(fetchCharacterDataById).toHaveBeenCalledWith('1')
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      mockCharacter.name
    );
    expect(
      screen.getByText(`Status: ${mockCharacter.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockCharacter.gender}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      'src',
      mockCharacter.image
    );
  });

  it('ensures that clicking the close button hides the component', async () => {
    (fetchCharacterDataById as jest.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CharacterCardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        mockCharacter.name
      )
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });
});
