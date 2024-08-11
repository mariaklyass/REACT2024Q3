import { screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithProviders from '../../tests/renderWithProviders';
import CharacterDetails from './CharacterDetails';
import { mockCharacterDetails } from '../../utils/mocks';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      page: '1',
      search: 'rick',
    },
    push: vi.fn().mockResolvedValue(undefined),
  }),
}));

describe('CharacterDetails', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders character details correctly', async () => {
    renderWithProviders(<CharacterDetails character={mockCharacterDetails} />);

    const name = await screen.findByText('Rick Sanchez');
    expect(name).toBeInTheDocument();
    const status = await screen.findByText('Status: Alive');
    expect(status).toBeInTheDocument();
  });

  it('handles closing details component by clicking the close button', async () => {
    renderWithProviders(<CharacterDetails character={mockCharacterDetails} />);

    const user = userEvent.setup();
    const closeButton = screen.getByText(/Close/i);
    await user.click(closeButton);
    expect(window.location.search).not.toContain('details=1');
  });
});
