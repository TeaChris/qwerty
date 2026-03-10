import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
      children: ReactNode;
      fallback?: ReactNode;
}

interface State {
      hasError: boolean;
      error: Error | null;
}

/**
 * Top-level ErrorBoundary — catches unhandled render errors and shows a
 * styled fallback instead of a blank/white page.
 *
 * Class component is required by React since error boundaries cannot be
 * expressed as function components (they need componentDidCatch / getDerivedStateFromError).
 */
export class ErrorBoundary extends Component<Props, State> {
      state: State = { hasError: false, error: null };

      static getDerivedStateFromError(error: Error): State {
            return { hasError: true, error };
      }

      componentDidCatch(error: Error, info: ErrorInfo) {
            console.error('[ErrorBoundary] Uncaught error:', error, info);
      }

      handleReload = () => {
            // Reset state and let React try to re-render
            this.setState({ hasError: false, error: null });
            window.location.reload();
      };

      render() {
            if (this.state.hasError) {
                  if (this.props.fallback) return this.props.fallback;

                  return (
                        <div
                              style={{
                                    minHeight: '100vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--bg-canvas, #0a0a0a)',
                                    color: 'var(--text-primary, #ffffff)',
                                    fontFamily: 'system-ui, sans-serif',
                                    padding: '2rem',
                                    textAlign: 'center'
                              }}
                        >
                              <div
                                    style={{
                                          width: 64,
                                          height: 64,
                                          background: 'rgba(239,68,68,0.15)',
                                          borderRadius: '50%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '2rem',
                                          marginBottom: '1.5rem',
                                          border: '2px solid rgba(239,68,68,0.4)'
                                    }}
                              >
                                    ⚠
                              </div>
                              <h1
                                    style={{
                                          fontSize: '1.5rem',
                                          fontWeight: 800,
                                          marginBottom: '0.5rem',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.05em'
                                    }}
                              >
                                    Something went wrong
                              </h1>
                              <p
                                    style={{
                                          color: 'rgba(255,255,255,0.5)',
                                          fontSize: '0.875rem',
                                          marginBottom: '2rem',
                                          maxWidth: 400
                                    }}
                              >
                                    {this.state.error?.message ||
                                          'An unexpected error occurred. Our team has been notified.'}
                              </p>
                              <button
                                    onClick={this.handleReload}
                                    style={{
                                          padding: '0.75rem 2rem',
                                          background: 'linear-gradient(135deg, #f97316, #ef4444)',
                                          color: '#fff',
                                          border: 'none',
                                          borderRadius: '0',
                                          fontWeight: 700,
                                          fontSize: '0.875rem',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.1em',
                                          cursor: 'pointer'
                                    }}
                              >
                                    Reload Page
                              </button>
                        </div>
                  );
            }

            return this.props.children;
      }
}
