import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterCard from './CharacterCard';

describe('CharacterCard', () => {
  it('renders correctly with given props', () => {
    const props = {
      id: '1',
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      onClick: vi.fn(),
    };

    render(<CharacterCard {...props} />);

    const img = screen.getByAltText('Rick Sanchez');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', props.image);

    const name = screen.getByText('Rick Sanchez');
    expect(name).toBeInTheDocument();

    const button = screen.getByText('Details');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick with the correct id when button is clicked', () => {
    const props = {
      id: '1',
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      onClick: vi.fn(),
    };

    render(<CharacterCard {...props} />);

    const button = screen.getByText('Details');
    fireEvent.click(button);

    expect(props.onClick).toHaveBeenCalledWith(props.id);
  });
});
