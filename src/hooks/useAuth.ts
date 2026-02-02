import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authService } from '../services/auth.service';
import type { User } from '../types/sale.types';

interface UseAuthResult {
      user: User | null;
      isAuthenticated: boolean;
      isLoading: boolean;
      login: (email: string, password: string) => Promise<boolean>;
      logout: () => void;
}

export function useAuth(): UseAuthResult {
      const { user, isAuthenticated, isLoading, setUser, setLoading, logout: storeLogout } = useAuthStore();

      // Check for existing session on mount
      useEffect(() => {
            if (authService.isAuthenticated() && !user) {
                  // In a real app, you'd validate the token with the server
                  // For now, we'll just set authenticated state
                  // The user info would come from a /auth/me endpoint
            }
      }, [user]);

      const login = useCallback(
            async (email: string, password: string): Promise<boolean> => {
                  setLoading(true);

                  try {
                        const { data, error } = await authService.login({ email, password });

                        if (data) {
                              setUser(data.user);
                              toast.success('Login successful! 🎉');
                              return true;
                        } else {
                              const message = (error as { message?: string })?.message || 'Login failed';
                              toast.error(message);
                              return false;
                        }
                  } catch (err) {
                        console.error('Login error:', err);
                        toast.error('Something went wrong. Please try again.');
                        return false;
                  } finally {
                        setLoading(false);
                  }
            },
            [setUser, setLoading]
      );

      const logout = useCallback(() => {
            authService.logout();
            storeLogout();
            toast.success('Logged out successfully');
      }, [storeLogout]);

      return {
            user,
            isAuthenticated,
            isLoading,
            login,
            logout
      };
}
