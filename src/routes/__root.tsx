import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import '../index.css';

const RootComponent = () => {
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
