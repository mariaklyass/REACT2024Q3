import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ReactNode } from 'react';

export interface Character {
  id?: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin?: {
    name: string;
    url: string;
  };
  location?: {
    name: string;
    url: string;
  };
  image: string;
  episode?: string[];
  url?: string;
  created?: string;
}

export interface CharacterListProps {
  results: Character[];
  error: Error | FetchBaseQueryError | SerializedError | null;
  currentPage: number;
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
  loading: boolean;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse {
  info: Info;
  results: Character[];
}

export interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface RouteError {
  status?: number;
  message?: string;
}

export interface FetchCharactersParams {
  name: string;
  page: number;
}
