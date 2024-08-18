import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Suggestions from '../../models/suggestions';
import { RHFAutocompleteProps } from '../../models/types';

const RHFAutocomplete: React.FC<RHFAutocompleteProps> = ({
  title,
  callback,
  value = '',
  children,
  register,
}) => {
  const countries = useAppSelector(state => state.countries);
  const [list, setList] = useState(countries);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (value !== undefined) {
      const newList = countries.filter(item => {
        return item.includes(value.charAt(0).toUpperCase() + value.slice(1));
      });
      setList(newList);
    }
  }, [value, isOpen, countries]);

  return (
    <label className="">
      <div className="">{title}</div>
      <input
        autoComplete="off"
        className=""
        type="text"
        onClick={toggleMenu}
        {...register}
        value={value || ''}
      />
      {children}
      {isOpen && <Suggestions countries={list} updateValue={callback} />}
    </label>
  );
};

export default RHFAutocomplete;
