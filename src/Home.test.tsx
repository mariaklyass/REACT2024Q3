import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { fetchCharacterData } from './utils/api';
import { Character } from './utils/types';

type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

vi.mock('./utils/api', () => ({
  fetchCharacterData: vi.fn(),
}));

const localStorageMock: LocalStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

vi.mock('./hooks/useLocalStorage', () => ({
  default: (key: string, initialValue: string) => {
    const value = localStorageMock.getItem(key) || initialValue;
    return [value, localStorageMock.setItem] as [
      string,
      (value: string) => void,
    ];
  },
}));

describe('Home Component', () => {
  const mockCharacters: Character[] = [
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly and fetches character data', async () => {
    (fetchCharacterData as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      totalPages: 1,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(fetchCharacterData).toHaveBeenCalled());

    expect(screen.getByText('All Characters')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    (fetchCharacterData as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      totalPages: 2,
    });

    render(
      <MemoryRouter initialEntries={['/?frontpage=1']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchCharacterData).toHaveBeenCalledWith('', 1));

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => expect(fetchCharacterData).toHaveBeenCalledWith('', 2));

    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});
