import { api } from '../lib';
import type { CreateFlashSaleRequest, FlashSale } from '../types/sales';

export const getFlashSales = async (page = 1, limit = 10, status?: string) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(status && { status })
      });

      return api<{ status: string; data: { flashSales: FlashSale[] } }>(`/flash-sales?${params}`);
};

export const getActiveFlashSale = async () => {
      return api<{ status: string; data: { flashSales: FlashSale[] } }>('/flash-sales/active');
};

export const createFlashSale = async (data: CreateFlashSaleRequest) => {
      return api<{ status: string; message: string; data: { flashSale: FlashSale } }>('/flash-sales', data);
};

export const activateFlashSale = async (id: string) => {
      return api<{ status: string; message: string }>(`/flash-sales/${id}/activate`, {}, 'PATCH');
};

export const deactivateFlashSale = async (id: string) => {
      return api<{ status: string; message: string }>(`/flash-sales/${id}/deactivate`, {}, 'PATCH');
};
