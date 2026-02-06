import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authService } from '../services/auth.service';
import { setAccessToken, getAccessToken } from '../lib/utils';
import type { User, RegisterRequest } from '../types/sale.types';

interface UseAuthResult {
      user: User | null;
      logout: () => void;
      isLoading: boolean;
      isInitialized: boolean;
      isAuthenticated: boolean;
      register: (data: RegisterRequest) => Promise<boolean>;
      login: (email: string, password: string) => Promise<boolean>;
}

export function useAuth(): UseAuthResult {
      const {
            user,
            setUser,
            isLoading,
            setLoading,
            isInitialized,
            setInitialized,
            isAuthenticated,
            logout: storeLogout
      } = useAuthStore();

      // Check for existing session on mount
      useEffect(() => {
            const restoreSession = async () => {
                  if (isInitialized) return;

                  const token = getAccessToken();
                  if (!user && token) {
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
                              setInitialized(true);
                        }
                  } else {
                        setInitialized(true);
                  }
            };

            restoreSession();
      }, [user, setUser, setLoading, isInitialized, setInitialized]);

      const login = useCallback(
            async (email: string, password: string): Promise<boolean> => {
                  setLoading(true);

                  try {
                        const { data, error } = await authService.login({ email, password });

                        if (data?.data?.user) {
                              if (data.data.accessToken) {
                                    setAccessToken(data.data.accessToken);
                              }
                              setUser(data.data.user);
                              setInitialized(true);
                              toast.success('Login successful! 🎉');
                              return true;
                        } else {
                              const message = error?.message || 'Login failed';
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
            [setUser, setLoading, setInitialized]
      );

      const register = useCallback(
            async (formData: RegisterRequest): Promise<boolean> => {
                  setLoading(true);

                  try {
                        const { data, error } = await authService.register(formData);

                        if (data?.status === 'success') {
                              toast.success(data.message || 'Registration successful! Please verify your email.');
                              return true;
                        } else {
                              const message = error?.message || 'Registration failed';
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
            [setLoading]
      );

      const logout = useCallback(() => {
            authService.logout();
            storeLogout();
            toast.success('Logged out successfully');
      }, [storeLogout]);

      return {
            user,
            login,
            logout,
            register,
            isLoading,
            isInitialized,
            isAuthenticated
      };
}
