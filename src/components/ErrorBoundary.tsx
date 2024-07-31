import React, { ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../interfaces';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <p> OOPS...Seems like an error occured!</p>
          <p>
            <Link to="/" className={'back-btn'}>
              Back to settings
            </Link>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
