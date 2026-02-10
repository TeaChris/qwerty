import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
      children: ReactNode;
      fallback?: ReactNode;
      onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
      hasError: boolean;
      error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
      constructor(props: Props) {
            super(props);
            this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error): State {
            return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: ErrorInfo) {
            // Log error to console in development
            if (import.meta.env.DEV) {
                  console.error('ErrorBoundary caught an error:', error, errorInfo);
            }

            // Call optional error handler
            this.props.onError?.(error, errorInfo);

            // In production, you might want to send to an error tracking service
            // Example: logErrorToService(error, errorInfo);
      }

      handleReset = () => {
            this.setState({ hasError: false, error: null });
      };

      handleGoHome = () => {
            window.location.href = '/';
      };

      render() {
            if (this.state.hasError) {
                  if (this.props.fallback) {
                        return this.props.fallback;
                  }

                  return (
                        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                              <div className="max-w-md w-full space-y-6 text-center">
                                    <div className="space-y-4">
                                          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                                                <svg
                                                      className="w-10 h-10 text-red-500"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      aria-hidden="true"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                      />
                                                </svg>
                                          </div>

                                          <h1 className="text-2xl font-bold text-white font-display">
                                                Something went wrong
                                          </h1>

                                          <p className="text-slate-400">
                                                We encountered an unexpected error. This has been logged and we'll look
                                                into it.
                                          </p>

                                          {import.meta.env.DEV && this.state.error && (
                                                <details className="text-left bg-slate-900 rounded-lg p-4 border border-slate-800">
                                                      <summary className="text-sm font-medium text-slate-300 cursor-pointer hover:text-white transition-colors">
                                                            Error Details (Dev Only)
                                                      </summary>
                                                      <pre className="mt-3 text-xs text-red-400 overflow-auto max-h-48">
                                                            {this.state.error.toString()}
                                                            {this.state.error.stack && `\n\n${this.state.error.stack}`}
                                                      </pre>
                                                </details>
                                          )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                          <button
                                                onClick={this.handleReset}
                                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                                          >
                                                Try Again
                                          </button>
                                          <button
                                                onClick={this.handleGoHome}
                                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors border border-slate-700"
                                          >
                                                Go Home
                                          </button>
                                    </div>

                                    <p className="text-sm text-slate-600">
                                          If this problem persists, please{' '}
                                          <a
                                                href="mailto:support@flashrush.com"
                                                className="text-orange-500 hover:underline"
                                          >
                                                contact support
                                          </a>
                                    </p>
                              </div>
                        </div>
                  );
            }

            return this.props.children;
      }
}
