import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import Flyout from './Flyout';
import selectedReducer, { unselectAll } from '../../../slices/selectedSlice';

vi.mock('../../../utils/downloader', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue('http://example.com/mock.csv'),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });

describe('Flyout Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  it('renders correctly with selected characters', () => {
    store = createTestStore();
    store.dispatch({
      type: 'selected/selectCharacter',
      payload: { id: 1, name: 'Character 1' },
    });
    store.dispatch({
      type: 'selected/selectCharacter',
      payload: { id: 2, name: 'Character 2' },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'http://example.com/mock.csv'
    );
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('handles "Unselect All" button click', () => {
    store = createTestStore();
    store.dispatch({
      type: 'selected/selectCharacter',
      payload: { id: 1, name: 'Character 1' },
    });

    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect All'));

    expect(dispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('does not render if no characters are selected', () => {
    store = createTestStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText('items selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });

  it('displays the correct download link when characters are selected', async () => {
    store = createTestStore();
    store.dispatch({
      type: 'selected/selectCharacter',
      payload: { id: 1, name: 'Character 1' },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        'http://example.com/mock.csv'
      );
    });
  });
});
