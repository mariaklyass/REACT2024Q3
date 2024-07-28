import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';
import { THEMES } from '../utils/types';

function TestComponent() {
  const { themeType, theme, setCurrentTheme } = useTheme();

  return (
    <div>
      <p data-testid="theme-type">{themeType}</p>
      <p data-testid="theme-primary">{theme['--primary']}</p>
      <button
        type="button"
        onClick={() =>
          setCurrentTheme(themeType === 'light' ? 'dark' : 'light')
        }
      >
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('should provide the correct initial theme values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-type').textContent).toBe('light');
    expect(screen.getByTestId('theme-primary').textContent).toBe(
      THEMES.light['--primary']
    );
  });

  it('should change the theme when setCurrentTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Toggle Theme').click();
    });

    expect(screen.getByTestId('theme-type').textContent).toBe('dark');
    expect(screen.getByTestId('theme-primary').textContent).toBe(
      THEMES.dark['--primary']
    );
  });
});
