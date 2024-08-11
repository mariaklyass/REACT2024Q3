import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher Component', () => {
  it('should render correctly with the correct initial state', () => {
    const handleChange = vi.fn();
    render(<ThemeSwitcher onChange={handleChange} isDarkMode={false} />);

    expect(screen.getByText(/theme switch/i)).toBeInTheDocument();

    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).toBeInTheDocument();

    expect(toggleInput).not.toBeChecked();
  });

  it('should call onChange when the switch is toggled', () => {
    const handleChange = vi.fn();
    render(<ThemeSwitcher onChange={handleChange} isDarkMode={false} />);

    const toggleInput = screen.getByRole('checkbox');

    fireEvent.click(toggleInput);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should reflect the correct state when isDarkMode is true', () => {
    const handleChange = vi.fn();
    render(<ThemeSwitcher onChange={handleChange} isDarkMode />);

    const toggleInput = screen.getByRole('checkbox');

    expect(toggleInput).toBeChecked();
  });
});
