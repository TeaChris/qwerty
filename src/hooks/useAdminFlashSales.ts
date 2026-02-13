import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import { getFlashSales, createFlashSale, activateFlashSale, deactivateFlashSale } from '../services/sales.service';
import { useAuthStore } from '../stores/auth.store';
import type { FlashSale, CreateFlashSaleRequest } from '../types/sales';

export const useAdminFlashSales = () => {
      const { user } = useAuthStore();
      const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
      const [loadingSales, setLoadingSales] = useState(true);
      const [statusFilter, setStatusFilter] = useState<string>('');

      const fetchFlashSales = useCallback(
            async (showLoading = true) => {
                  if (showLoading) {
                        setLoadingSales(true);
                  }
                  const { data, error } = await getFlashSales(1, 20, statusFilter);

                  if (error) {
                        toast.error('Failed to load flash sales');
                        console.error(error);
                  } else if (data) {
                        setFlashSales(data.data.flashSales);
                  }

                  setLoadingSales(false);
            },
            [statusFilter]
      );

      useEffect(() => {
            if (user?.role === 'ADMIN') {
                  // Direct fetch to avoid the "setState in effect" lint
                  getFlashSales(1, 20, statusFilter).then(({ data, error }) => {
                        if (error) {
                              toast.error('Failed to load flash sales');
                              console.error(error);
                        } else if (data) {
                              setFlashSales(data.data.flashSales);
                        }
                        setLoadingSales(false);
                  });
            }
      }, [user, statusFilter]);

      const handleCreateFlashSale = async (saleData: CreateFlashSaleRequest) => {
            const { error } = await createFlashSale(saleData);

            if (error) {
                  toast.error(error.message || 'Failed to create flash sale');
                  return false;
            }

            toast.success('Flash sale created successfully!');
            await fetchFlashSales();
            return true;
      };

      const handleActivate = async (id: string) => {
            const { error } = await activateFlashSale(id);

            if (error) {
                  toast.error(error.message || 'Failed to activate flash sale');
                  return;
            }

            toast.success('Flash sale activated!');
            await fetchFlashSales();
      };

      const handleDeactivate = async (id: string) => {
            if (!confirm('Are you sure you want to deactivate this flash sale?')) return;

            const { error } = await deactivateFlashSale(id);

            if (error) {
                  toast.error(error.message || 'Failed to deactivate flash sale');
                  return;
            }

            toast.success('Flash sale deactivated');
            await fetchFlashSales();
      };

      return {
            flashSales,
            loadingSales,
            statusFilter,
            setStatusFilter,
            fetchFlashSales,
            handleCreateFlashSale,
            handleActivate,
            handleDeactivate
      };
};
