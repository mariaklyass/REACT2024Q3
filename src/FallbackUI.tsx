import { Component } from 'react';

class FallbackUI extends Component {
  render() {
    return (
      <div>
        <h2>Oops! Something went wrong.</h2>
        <p>We apologize for the inconvenience.</p>
        <p>
          Please try refreshing the page or contact support if the problem
          persists.
        </p>
      </div>
    );
  }
}

export default FallbackUI;
