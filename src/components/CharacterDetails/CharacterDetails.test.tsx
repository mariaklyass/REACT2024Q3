import { screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import renderWithProviders from '../../tests/renderWithProviders';
import CharacterDetails from './CharacterDetails';
import { mockCharacterDetails } from '../../utils/mocks';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: () => ({
    toString: () => 'page=1&search=rick',
    delete: vi.fn(),
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
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    renderWithProviders(<CharacterDetails character={mockCharacterDetails} />);

    const user = userEvent.setup();
    const closeButton = screen.getByText(/Close/i);
    await user.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?page=1&search=rick');
  });
});
