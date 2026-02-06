import { create } from 'zustand';
import { clearAccessToken } from '../lib/utils';
import type { User } from '../types/sale.types';

interface AuthState {
      user: User | null;
      isLoading: boolean;
      isInitialized: boolean;
      isAuthenticated: boolean;

      // Actions
      setInitialized: (val: boolean) => void;
      setUser: (user: User | null) => void;
      setLoading: (val: boolean) => void;
      logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      setUser: user =>
            set({
                  user,
                  isAuthenticated: !!user
            }),

      setLoading: val => set({ isLoading: val }),

      setInitialized: val => set({ isInitialized: val }),

      logout: () => {
            clearAccessToken();
            set({ user: null, isAuthenticated: false, isInitialized: true });
      }
}));
