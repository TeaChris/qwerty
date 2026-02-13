import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { getDashboardStats } from '../services';
import type { DashboardStats } from '../types/admin';
import { useAuthStore } from '../stores/auth.store';

export const useAdminStats = () => {
      const { user } = useAuthStore();
      const [stats, setStats] = useState<DashboardStats | null>(null);
      const [loadingStats, setLoadingStats] = useState(true);

      const fetchStats = useCallback(async () => {
            setLoadingStats(true);
            const { data, error } = await getDashboardStats();

            if (error) {
                  toast.error('Failed to load dashboard stats');
                  console.error(error);
            } else if (data) {
                  setStats(data.data.stats);
            }

            setLoadingStats(false);
      }, []);

      useEffect(() => {
            if (user?.role === 'ADMIN') {
                  // Direct fetch to avoid the "setState in effect" lint which triggers
                  // if we call a function that performs synchronous state updates.
                  // Since loadingStats is true by default, we just need to fetch and set stats.
                  getDashboardStats().then(({ data, error }) => {
                        if (error) {
                              toast.error('Failed to load dashboard stats');
                              console.error(error);
                        } else if (data) {
                              setStats(data.data.stats);
                        }
                        setLoadingStats(false);
                  });
            }
      }, [user]);

      return {
            stats,
            loadingStats,
            fetchStats
      };
};
