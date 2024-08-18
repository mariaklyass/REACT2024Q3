import React, { useState, ChangeEvent } from 'react';
import { useAppSelector } from '../../store/hooks';
import Suggestions from '../../models/suggestions';
import { AutocompleteProps } from '../../models/types';

const Autocomplete: React.FC<AutocompleteProps> = ({
  title,
  callback,
  getValue,
  children,
}) => {
  const countries = useAppSelector(state => state.countries);
  const [list, setList] = useState<string[]>(countries);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(getValue() || '');

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filterList(value);
  };

  const handleFocus = () => {
    toggleMenu();
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  const filterList = (value: string) => {
    const filteredList = countries.filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setList(filteredList);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    callback(suggestion);
    setIsOpen(false);
  };

  return (
    <label className="relative w-full">
      <div className="max-w-contain relative block">{title}</div>
      <input
        autoComplete="off"
        className="relative z-20 w-full rounded px-4 font-normal text-black"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {children}
      {isOpen && (
        <Suggestions countries={list} updateValue={handleSuggestionClick} />
      )}
    </label>
  );
};

export default Autocomplete;
