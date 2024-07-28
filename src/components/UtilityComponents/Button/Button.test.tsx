import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Button from './Button';
import { THEMES, Color } from '../../../utils/types';

describe('Button Component', () => {
  const theme = THEMES.light;

  test('renders correctly with children', () => {
    render(
      <Button type="primary" theme={theme} onClick={() => {}}>
        Click Me
      </Button>
    );

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = vi.fn();

    render(
      <Button type="primary" theme={theme} onClick={handleClick}>
        Click Me
      </Button>
    );

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct theme style', () => {
    render(
      <Button type="primary" theme={theme} onClick={() => {}}>
        Click Me
      </Button>
    );

    const button = screen.getByText('Click Me');
    expect(button).toHaveStyle({
      '--primary': Color.VIOLET,
      '--secondary': Color.DARK_VIOLET,
      '--background': Color.LIGHT_GRAY,
      '--white': Color.WHITE,
    });
  });

  test('applies the correct type class', () => {
    render(
      <Button type="secondary" theme={theme} onClick={() => {}}>
        Click Me
      </Button>
    );

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('button button--secondary');
  });
});
