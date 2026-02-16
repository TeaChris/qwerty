import { useEffect, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useSaleStore } from '../stores/sale.store';
import { saleService } from '../services/sale.service';
import { useCountdown } from './useCountdown';
import { socket, connectSocket, disconnectSocket } from '../lib/socket';
import type { SaleStatus, LeaderboardEntry } from '../types/sale.types';

interface UseFlashSaleResult {
      status: SaleStatus | null;
      timeRemaining: ReturnType<typeof useCountdown>;
      timeUntilStart: ReturnType<typeof useCountdown>;
      canPurchase: boolean;
      isPurchasing: boolean;
      purchase: () => Promise<boolean>;
      leaderboard: LeaderboardEntry[];
      leaderboardTotal: number;
      isLoading: boolean;
}

export function useFlashSale(productId?: string): UseFlashSaleResult {
      const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
      const [leaderboardTotal, setLeaderboardTotal] = useState(0);

      const {
            status,
            setStatus,
            isPurchasing,
            setPurchasing,
            recordPurchase,
            canPurchase: checkCanPurchase,
            decrementStock
      } = useSaleStore();

      const isLoadingRef = useRef(false);

      // Countdown to sale end (when live)
      const timeRemaining = useCountdown(status?.status === 'live' ? status.endsAt : null);

      // Countdown to sale start (when upcoming)
      const timeUntilStart = useCountdown(status?.status === 'upcoming' ? status.startsAt : null);

      // Fetch sale status
      const fetchStatus = useCallback(async () => {
            if (isLoadingRef.current) return;

            isLoadingRef.current = true;
            const { data, error } = await saleService.getStatus(productId);
            isLoadingRef.current = false;

            if (data) {
                  setStatus(data);
            } else if (error) {
                  console.error('Failed to fetch sale status:', error);
            }
      }, [setStatus, productId]);

      // Fetch leaderboard
      const fetchLeaderboard = useCallback(async () => {
            if (!status?._id) return;
            const { data } = await saleService.getLeaderboard(status._id, 1, 10);
            if (data) {
                  setLeaderboard(data.entries);
                  setLeaderboardTotal(data.total);
            }
      }, [status?._id]);

      // Initial fetch and Socket.io setup
      useEffect(() => {
            fetchStatus();
            fetchLeaderboard();
            connectSocket();

            if (status?._id) {
                  socket.emit('join_sale', status._id);
            }

            const handleStockUpdate = ({
                  productId,
                  remainingStock
            }: {
                  productId: string;
                  remainingStock: number;
            }) => {
                  if (status?.productId === productId) {
                        setStatus({ ...status, remainingStock });
                  }
            };

            const handleNewPurchase = (purchase: { username: string; purchasedAt: string }) => {
                  toast.info(`${purchase.username} acquired a unit!`, {
                        description: new Date(purchase.purchasedAt).toLocaleTimeString()
                  });

                  setLeaderboard(prev => [
                        {
                              rank: prev.length + 1, // Rough rank for live feed
                              userId: '',
                              username: purchase.username,
                              purchasedAt: purchase.purchasedAt
                        },
                        ...prev.slice(0, 9)
                  ]);
                  setLeaderboardTotal(prev => prev + 1);
            };

            socket.on('stock_update', handleStockUpdate);
            socket.on('new_purchase', handleNewPurchase);

            return () => {
                  socket.off('stock_update', handleStockUpdate);
                  socket.off('new_purchase', handleNewPurchase);
                  disconnectSocket();
            };
      }, [fetchStatus, fetchLeaderboard, setStatus, status]);

      // Purchase handler
      const purchase = useCallback(async (): Promise<boolean> => {
            if (!checkCanPurchase()) {
                  toast.error('Unable to purchase at this time');
                  return false;
            }

            setPurchasing(true);

            // Optimistic update - decrement stock immediately
            decrementStock();

            try {
                  const { data, error } = await saleService.purchase(status?._id || '', status?.productId || '');

                  if (data?.success) {
                        recordPurchase();
                        toast.success('Purchase successful! 🎉');

                        // Refresh status to get latest stock
                        await fetchStatus();
                        return true;
                  } else {
                        // Revert optimistic update on failure
                        await fetchStatus();

                        const message = data?.message || (error as { message?: string })?.message || 'Purchase failed';
                        toast.error(message);
                        return false;
                  }
            } catch (err) {
                  console.error('Purchase error:', err);
                  await fetchStatus();
                  toast.error('Something went wrong. Please try again.');
                  return false;
            } finally {
                  setPurchasing(false);
            }
      }, [checkCanPurchase, setPurchasing, decrementStock, recordPurchase, fetchStatus]);

      return {
            status,
            timeRemaining,
            timeUntilStart,
            canPurchase: checkCanPurchase(),
            isPurchasing,
            purchase,
            leaderboard,
            leaderboardTotal,
            isLoading: isLoadingRef.current
      };
}
