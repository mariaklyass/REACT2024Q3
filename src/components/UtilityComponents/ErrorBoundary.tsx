import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../utils/types';

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    return hasError ? fallback : children;
  }
}
