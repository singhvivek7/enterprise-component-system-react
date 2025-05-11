import React, { Component, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  componentName?: string;
  onRetry?: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      `Error in ${this.props.componentName || 'component'}:`,
      error,
      errorInfo
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className={cn(
              'bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive-foreground',
              'flex flex-col items-center justify-center min-h-[100px]'
            )}
            role="alert"
            aria-live="assertive">
            <h3 className="font-semibold">
              Something went wrong with{' '}
              {this.props.componentName || 'this component'}.
            </h3>
            <p className="mt-2 text-sm">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={this.handleRetry}
              aria-label="Retry rendering the component">
              Retry
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
