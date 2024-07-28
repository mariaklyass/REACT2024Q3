import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { store } from './store';
import App from './App';

describe('App Component', () => {
  it('renders the app and toggles the theme', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const lightButton = screen.getByText('Light');
    expect(lightButton).toBeInTheDocument();

    const darkButton = screen.getByText('Dark');
    expect(darkButton).toBeInTheDocument();

    const themeIcon = screen.getByAltText('theme icon');
    expect(themeIcon).toHaveAttribute(
      'src',
      expect.stringContaining('light.svg')
    );

    fireEvent.click(darkButton);

    expect(themeIcon).toHaveAttribute(
      'src',
      expect.stringContaining('dark.svg')
    );
  });
});
