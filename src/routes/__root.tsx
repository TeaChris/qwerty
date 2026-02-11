import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { useAuth } from '../hooks';
import '../index.css';

const RootComponent = () => {
      const { isInitialized } = useAuth();

      // Show loading state while checking authentication
      if (!isInitialized) {
            return (
                  <div
                        className="min-h-screen flex items-center justify-center"
                        style={{ background: 'var(--bg-canvas)' }}
                  >
                        <div className="flex flex-col items-center gap-6">
                              <div className="relative">
                                    {/* Spinning octagon */}
                                    <div
                                          className="w-16 h-16 border-4 border-(--border-accent) border-t-(--accent-primary) animate-spin"
                                          style={{
                                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                          }}
                                    />
                                    {/* Glow effect */}
                                    <div
                                          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-(--accent-primary) opacity-20 blur-md animate-spin"
                                          style={{
                                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                          }}
                                    />
                              </div>
                              <div className="space-y-2 text-center">
                                    <p className="micro-text text-(--text-muted) animate-pulse">INITIALIZING SYSTEM</p>
                                    <p className="mono-number text-xs text-(--text-muted)">[ █████░░░░░ ] 50%</p>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <>
                  <Outlet />
                  <Toaster position="top-right" richColors theme="dark" />
            </>
      );
};

export const Route = createRootRoute({
      component: RootComponent
});
