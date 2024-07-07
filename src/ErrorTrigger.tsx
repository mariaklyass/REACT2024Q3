import { Component } from 'react';
import { ErrorBoundaryState } from './utils/types';
import './ErrorTrigger.css';

class ErrorTrigger extends Component<
  Record<string, never>,
  ErrorBoundaryState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    try {
      throw new Error('Simulated error');
    } catch (error) {
      this.setState({ hasError: true });
    }
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Simulated error');
    }

    return (
      <button type="button" onClick={this.handleClick} className="trigger-btn">
        Trigger Button
      </button>
    );
  }
}

export default ErrorTrigger;
