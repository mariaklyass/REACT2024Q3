import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [value, setValue] = useState<string>(() => {
    const valueLS = localStorage.getItem(key);
    return valueLS !== null ? valueLS : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
