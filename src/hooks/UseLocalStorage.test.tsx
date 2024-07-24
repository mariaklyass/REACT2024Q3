import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValue';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem(key, 'storedValue');

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value] = result.current;

    expect(value).toBe('storedValue');
  });

  it('should initialize with the initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value] = result.current;

    expect(value).toBe(initialValue);
  });

  it('should update the value and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [, setValue] = result.current;

    act(() => {
      setValue('newValue');
    });

    const [newValue] = result.current;

    expect(newValue).toBe('newValue');
    expect(localStorage.getItem(key)).toBe('newValue');
  });
});
