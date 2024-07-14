import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [value, setValue] = useState<string>(() => {
    const valueLS = localStorage.getItem(key);
    return valueLS !== null ? valueLS : initialValue;
  });

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  useEffect(() => {
    const valueLS = localStorage.getItem(key);
    if (valueLS !== null) {
      setValue(valueLS);
    } else {
      localStorage.setItem(key, initialValue);
      setValue(initialValue);
    }
  }, [key, initialValue]);

  return [value, updateValue] as const;
};

export default useLocalStorage;
