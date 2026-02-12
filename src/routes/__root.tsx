import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { useAuth } from '../hooks';
import { LoadingScreen } from '../components';
import '../index.css';

const RootComponent = () => {
      const { isInitialized } = useAuth();

      // Show loading state while checking authentication
      if (!isInitialized) {
            return <LoadingScreen message="Establishing Secure Link" progress={75} />;
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
