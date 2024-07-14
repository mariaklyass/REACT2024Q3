import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../UtilityComponents/ErrorBoundary';
import FallbackUI from '../UtilityComponents/FallbackUI';
import ErrorTrigger from '../UtilityComponents/ErrorTrigger';
import '../App.css';
import Home from '../Home';

export default function Root() {
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
