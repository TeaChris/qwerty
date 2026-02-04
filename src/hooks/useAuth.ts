import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authService } from '../services/auth.service';
import type { User, RegisterRequest } from '../types/sale.types';

interface UseAuthResult {
      user: User | null;
      isAuthenticated: boolean;
      isLoading: boolean;
      login: (email: string, password: string) => Promise<boolean>;
      register: (data: RegisterRequest) => Promise<boolean>;
      logout: () => void;
}

export function useAuth(): UseAuthResult {
      const { user, isAuthenticated, isLoading, setUser, setLoading, logout: storeLogout } = useAuthStore();

      // Check for existing session on mount
      useEffect(() => {
            const restoreSession = async () => {
                  if (!user && sessionStorage.getItem('access_token')) {
                        setLoading(true);
                        try {
                              const { data } = await authService.getMe();
                              if (data?.data?.user) {
                                    setUser(data.data.user);
                              }
                        } catch (_err) {
                              console.error('Session restoration failed:', _err);
                        } finally {
                              setLoading(false);
                        }
                  }
            };

            restoreSession();
      }, [user, setUser, setLoading]);

      const login = useCallback(
            async (email: string, password: string): Promise<boolean> => {
                  setLoading(true);

                  try {
                        const { data, error } = await authService.login({ email, password });

                        if (data?.data?.user) {
                              setUser(data.data.user);
                              toast.success('Login successful! 🎉');
                              return true;
                        } else {
                              const message = (error as { message?: string })?.message || 'Login failed';
                              toast.error(message);
                              return false;
                        }
                  } catch (_err) {
                        console.error('Login error:', _err);
                        toast.error('Something went wrong. Please try again.');
                        return false;
                  } finally {
                        setLoading(false);
                  }
            },
            [setUser, setLoading]
      );

      const register = useCallback(
            async (formData: RegisterRequest): Promise<boolean> => {
                  setLoading(true);

                  try {
                        const { data, error } = await authService.register(formData);

                        if (data?.data?.user) {
                              setUser(data.data.user);
                              toast.success('Registration successful! Welcome 🎉');
                              return true;
                        } else {
                              const message = (error as { message?: string })?.message || 'Registration failed';
                              toast.error(message);
                              return false;
                        }
                  } catch (_err) {
                        console.error('Registration error:', _err);
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
            register,
            logout
      };
}
