import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../lib/index';
import { setAccessToken, clearAccessToken } from '../lib/utils';
import type { IUser } from '../types';

interface AuthState {
      user: IUser | null;
      isAuthenticated: boolean;
      isLoading: boolean;
      setUser: (user: IUser | null) => void;
      login: (data: Record<string, unknown>) => Promise<void>;
      logout: () => void;
}

export const useAuth = create<AuthState>()(
      persist(
            set => ({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,

                  setUser: user => set({ user, isAuthenticated: !!user }),

                  login: async (data: Record<string, unknown>) => {
                        set({ isLoading: true });
                        try {
                              const { data: userData, error } = await api<{ user: IUser; accessToken: string }>(
                                    '/auth/login',
                                    data
                              );
                              if (error) throw error;

                              if (userData?.accessToken) {
                                    setAccessToken(userData.accessToken);
                                    set({ user: userData.user, isAuthenticated: true, isLoading: false });
                              } else {
                                    // This case should ideally not happen if the API is well-behaved
                                    // and doesn't return null userData with no error, but handling it defensively.
                                    set({ isLoading: false });
                                    throw new Error('Login failed: No user data or access token received.');
                              }
                        } catch (error) {
                              set({ isLoading: false });
                              throw error;
                        }
                  },

                  logout: () => {
                        clearAccessToken();
                        set({ user: null, isAuthenticated: false });
                        window.location.href = '/login';
                  }
            }),
            {
                  name: 'auth-storage',
                  storage: createJSONStorage(() => sessionStorage),
                  partialize: state => ({ user: state.user, isAuthenticated: state.isAuthenticated })
            }
      )
);
