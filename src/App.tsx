import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/UtilityComponents/ErrorBoundary';
import FallbackUI from './components/UtilityComponents/FallbackUI';
import ErrorTrigger from './components/UtilityComponents/ErrorTrigger';
import './App.css';
import Home from './components/Home/Home';

export default function App() {
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <ErrorTrigger />
      <div className="app">
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
