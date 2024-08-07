import React from 'react';

interface ThemeSwitcherProps {
  onChange: () => void;
  isDarkMode: boolean;
}

function ThemeSwitcher({ onChange, isDarkMode }: ThemeSwitcherProps) {
  return (
    <div className="theme-toggle-switch">
      <h2>Theme Switch</h2>
      <label className="switch" htmlFor="toggler">
        {' '}
        <input
          id="toggler"
          type="checkbox"
          checked={isDarkMode}
          onChange={onChange}
        />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default ThemeSwitcher;
