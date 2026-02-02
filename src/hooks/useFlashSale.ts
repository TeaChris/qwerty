import { useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { useSaleStore } from '../stores/sale.store';
import { saleService } from '../services/sale.service';
import { useCountdown } from './useCountdown';
import type { SaleStatus } from '../types/sale.types';

interface UseFlashSaleResult {
      status: SaleStatus | null;
      timeRemaining: ReturnType<typeof useCountdown>;
      timeUntilStart: ReturnType<typeof useCountdown>;
      canPurchase: boolean;
      isPurchasing: boolean;
      purchase: () => Promise<boolean>;
      isLoading: boolean;
}

const POLL_INTERVAL = 2000; // Poll every 2 seconds

export function useFlashSale(): UseFlashSaleResult {
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
      const pollIntervalRef = useRef<number | null>(null);

      // Countdown to sale end (when live)
      const timeRemaining = useCountdown(status?.status === 'live' ? status.endsAt : null);

      // Countdown to sale start (when upcoming)
      const timeUntilStart = useCountdown(status?.status === 'upcoming' ? status.startsAt : null);

      // Fetch sale status
      const fetchStatus = useCallback(async () => {
            if (isLoadingRef.current) return;

            isLoadingRef.current = true;
            const { data, error } = await saleService.getStatus();
            isLoadingRef.current = false;

            if (data) {
                  setStatus(data);
            } else if (error) {
                  console.error('Failed to fetch sale status:', error);
            }
      }, [setStatus]);

      // Initial fetch and polling
      useEffect(() => {
            fetchStatus();

            pollIntervalRef.current = window.setInterval(fetchStatus, POLL_INTERVAL);

            return () => {
                  if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                  }
            };
      }, [fetchStatus]);

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
                  const { data, error } = await saleService.purchase();

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
            isLoading: isLoadingRef.current
      };
}
