import { create } from 'zustand';
import type { SaleStatus, LeaderboardEntry } from '../types/sale.types';

interface SaleState {
      status: SaleStatus | null;
      leaderboard: LeaderboardEntry[];
      isPurchasing: boolean;
      lastPurchaseTime: number | null;
      purchaseCooldown: number; // milliseconds

      // Actions
      setStatus: (status: SaleStatus | null) => void;
      setLeaderboard: (entriesOrFn: LeaderboardEntry[] | ((prev: LeaderboardEntry[]) => LeaderboardEntry[])) => void;
      setPurchasing: (val: boolean) => void;
      recordPurchase: () => void;
      canPurchase: () => boolean;
      decrementStock: () => void;
}

const PURCHASE_COOLDOWN_MS = 3000; // 3 seconds between purchase attempts

export const useSaleStore = create<SaleState>((set, get) => ({
      status: null,
      leaderboard: [],
      isPurchasing: false,
      lastPurchaseTime: null,
      purchaseCooldown: PURCHASE_COOLDOWN_MS,

      setStatus: status => set({ status }),

      setLeaderboard: entriesOrFn =>
            set(state => ({
                  leaderboard: typeof entriesOrFn === 'function' ? entriesOrFn(state.leaderboard) : entriesOrFn
            })),

      setPurchasing: val => set({ isPurchasing: val }),

      recordPurchase: () => set({ lastPurchaseTime: Date.now() }),

      canPurchase: () => {
            const state = get();
            const { status, isPurchasing, lastPurchaseTime, purchaseCooldown } = state;

            // Can't purchase if no status or not live
            if (!status || status.status !== 'live') return false;

            // Can't purchase if no stock
            if (status.remainingStock <= 0) return false;

            // Can't purchase if already purchasing
            if (isPurchasing) return false;

            // Can't purchase if within cooldown
            if (lastPurchaseTime && Date.now() - lastPurchaseTime < purchaseCooldown) {
                  return false;
            }

            return true;
      },

      decrementStock: () =>
            set(state => {
                  if (!state.status) return state;
                  return {
                        status: {
                              ...state.status,
                              remainingStock: Math.max(0, state.status.remainingStock - 1)
                        }
                  };
            })
}));
