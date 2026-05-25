import { Component } from 'react';
import { Button } from 'react-bootstrap';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.assign('/');
  };

  render() {
    if (this.state.error) {
      return (
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center p-4"
          style={{ minHeight: '100vh' }}
        >
          <h3>Something went wrong</h3>
          <p className="text-muted">An unexpected error occurred. Please try again.</p>
          <pre
            className="text-danger small bg-body-tertiary p-2 rounded"
            style={{ maxWidth: 600, whiteSpace: 'pre-wrap' }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <Button onClick={this.handleReset} className="mt-3">
            Reload app
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
