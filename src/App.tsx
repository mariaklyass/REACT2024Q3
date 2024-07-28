import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/UtilityComponents/ErrorBoundary';
import FallbackUI from './components/UtilityComponents/FallbackUI';
import ErrorTrigger from './components/UtilityComponents/ErrorTrigger';
import './App.css';
import Home from './components/Home/Home';
import Button from './components/UtilityComponents/Button/Button';
import { useTheme } from './context/ThemeContext';
import themeLight from './assets/light.svg';
import themeDark from './assets/dark.svg';

export default function App() {
  const { theme, themeType, setCurrentTheme } = useTheme();

  const themeIcon = themeType === 'light' ? themeLight : themeDark;
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <ErrorTrigger />
      <section>
        <div>
          <Button
            type="primary"
            theme={theme}
            onClick={() => {
              setCurrentTheme('light');
            }}
          >
            Light
          </Button>
          <Button
            type="secondary"
            theme={theme}
            onClick={() => {
              setCurrentTheme('dark');
            }}
          >
            Dark
          </Button>
        </div>
        <div className="current-theme-msg">
          {' '}
          <p>The current theme is: </p>
          <img src={themeIcon} alt="theme icon" className="theme-icon" />
        </div>
      </section>
      <div className="app" style={{ ...(theme as React.CSSProperties) }}>
        <div className="sidebar">
          <Home />
        </div>
        <div className="detail">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
