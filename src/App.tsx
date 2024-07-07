import { Component } from 'react';
import './App.css';
import Home from './Home';
import ErrorBoundary from './ErrorBoundary';
import FallbackUI from './FallbackUI';
import ErrorTrigger from './ErrorTrigger';

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
