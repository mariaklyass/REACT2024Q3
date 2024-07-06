export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface SearchResultsProps {
  results: Character[];
  error: Error | null;
}

export interface CharacterCardProps {
  character: Character;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchBarState {
  searchQuery: string;
}
