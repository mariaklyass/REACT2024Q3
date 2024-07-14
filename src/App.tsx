import './App.css';
import ErrorBoundary from './UtilityComponents/ErrorBoundary';
import FallbackUI from './UtilityComponents/FallbackUI';
import ErrorTrigger from './UtilityComponents/ErrorTrigger';

function App() {
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <div className="app">
        <ErrorTrigger />
      </div>
    </ErrorBoundary>
  );
}

export default App;
