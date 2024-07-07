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

export interface CharacterListProps {
  results: Character[];
  error: Error | null;
}

export interface CharacterCardProps {
  character: Character;
}

export interface SearchBarProps {
  handleSubmit: (searchQuery: string) => void;
}

export interface SearchBarState {
  searchQuery: string;
}

export interface HomeState {
  results: Character[];
  error: Error | null;
}

export interface ApiResponse {
  results: Character[];
}
