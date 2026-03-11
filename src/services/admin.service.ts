import { api } from '../lib';
import type { AdminUser, DashboardStats } from '../types/admin';

export const getDashboardStats = async () => {
      return api<{ status: string; data: { stats: DashboardStats } }>('/admin/dashboard/stats');
};

export const getAllUsers = async (page = 1, limit = 20, search?: string) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && { search })
      });

      return api<{ status: string; data: { users: AdminUser[] } }>(`/admin/users?${params}`);
};

export const suspendUser = async (id: string) => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/suspend`, {}, 'PATCH');
};

export const unsuspendUser = async (id: string) => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/unsuspend`, {}, 'PATCH');
};

export const updateUserRole = async (id: string, role: 'ADMIN' | 'USER') => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/role`, { role }, 'PATCH');
};

export const getAnalytics = async (period: 'daily' | 'weekly' | 'monthly' = 'daily') => {
      return api<{
            status: string;
            data: {
                  salesStats: Array<{ _id: string; revenue: number; sales: number }>;
                  revenueByAsset: Array<{
                        _id: string;
                        totalRevenue: number;
                        totalSales: number;
                        assetDetails: { name: string; price: number };
                  }>;
            };
      }>(`/admin/analytics?period=${period}`);
};
