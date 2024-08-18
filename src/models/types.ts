import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
// input
export interface InputProps {
  title: string;
  type: string;
  name?: string;
  accept?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}
export interface SuggestionsProps {
  countries: string[];
  updateValue: (newValue: string) => void;
}

// select
export interface SelectProps {
  children: React.ReactNode;
  title: string;
  name?: string;
}

// autocomplete
export interface AutocompleteProps {
  title: string;
  callback: (newValue: string) => void;
  getValue: () => string | undefined;
  children: React.ReactNode;
}

// slices
export interface FormData {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  password: string | undefined;
  repeatedPassword: string | undefined;
  picture: FileList | undefined | null;
  country: string | undefined;
}

export type TileData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms?: boolean;
  picture: string | ArrayBuffer | null;
  country?: string;
};

export interface TilesState {
  tiles: TileData[];
}

// tile
export type TileProps = {
  item: TileData;
  isLast?: boolean;
};

// RHF
export interface RHFInput {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  repeatedPassword: string;
  picture: FileList;
  terms?: boolean;
  country: string;
}

export interface RHFSelectProps {
  title: string;
  children?: React.ReactNode;
  register: ReturnType<UseFormRegister<RHFInput>>;
}

export interface RHFAutocompleteProps {
  title: string;
  callback: (newValue: string) => void;
  value: string;
  children: React.ReactNode;
  register: UseFormRegisterReturn;
}
