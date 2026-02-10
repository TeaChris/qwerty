import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { useAuth } from '../hooks';
import '../index.css';

const RootComponent = () => {
      const { isInitialized } = useAuth();

      // Show loading state while checking authentication
      if (!isInitialized) {
            return (
                  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                              <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                              <p className="text-slate-400 text-sm font-medium">Loading...</p>
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
