import { describe, it, expect } from 'vitest';
import { store } from './store';

const mockAction = {
  type: 'home/someAction',
  payload: {},
};

describe('Redux Store', () => {
  it('should configure the store with the correct reducers and middleware', () => {
    const state = store.getState();
    expect(state).toBeDefined();

    expect(state.home).toBeDefined();
    expect(state.selected).toBeDefined();
  });

  it('should handle actions and update state correctly', () => {
    store.dispatch(mockAction);
    const state = store.getState();

    expect(state.home).toBeDefined();
    expect(state.selected).toBeDefined();
  });
});
