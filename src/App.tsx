import { Component } from 'react';
import './App.css';
import Home from './Home';
import ErrorBoundary from './UtilityComponents/ErrorBoundary';
import FallbackUI from './UtilityComponents/FallbackUI';
import ErrorTrigger from './UtilityComponents/ErrorTrigger';

class App extends Component {
  render() {
    return (
      <ErrorBoundary fallback={<FallbackUI />}>
        <div className="app">
          <ErrorTrigger />
          <Home />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
