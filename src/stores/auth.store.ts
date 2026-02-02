import { create } from 'zustand';
import { clearAccessToken } from '../lib/utils';
import type { User } from '../types/sale.types';

interface AuthState {
      user: User | null;
      isAuthenticated: boolean;
      isLoading: boolean;

      // Actions
      setUser: (user: User | null) => void;
      setLoading: (val: boolean) => void;
      logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: user =>
            set({
                  user,
                  isAuthenticated: !!user
            }),

      setLoading: val => set({ isLoading: val }),

      logout: () => {
            clearAccessToken();
            set({ user: null, isAuthenticated: false });
      }
}));
