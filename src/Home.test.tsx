import { test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('Verify that <Home /> displays <h1>All Characters</h1>', async () => {
  vi.mock('react-router-dom', async () => {
    const module = await vi.importActual('react-router-dom');
    return {
      ...module,
      useLoaderData: vi.fn(() => ({ someData: 'mockData' })),
    };
  });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>
  );

  await waitFor(() => {
    const cards = screen.getAllByTestId('card-element');
    expect(cards.length).toBe(20);
  });
});
