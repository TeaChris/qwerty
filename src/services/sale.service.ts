import { api } from '../lib/use.api';
import type { SaleStatus, PurchaseResponse, LeaderboardResponse } from '../types/sale.types';

// Mock data for development (until backend is connected)
const MOCK_SALE_STATUS: SaleStatus = {
      productId: 'prod_flash_001',
      productName: 'Premium Wireless Headphones',
      productImage: '/placeholder-product.jpg',
      status: 'live',
      startsAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // Started 30 mins ago
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // Ends in 2 hours
      totalStock: 200,
      remainingStock: 143,
      priceAmount: 79.99,
      priceCurrency: 'USD'
};

const MOCK_LEADERBOARD: LeaderboardResponse = {
      entries: [
            {
                  rank: 1,
                  userId: 'u1',
                  username: 'john***@email.com',
                  purchasedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
            },
            {
                  rank: 2,
                  userId: 'u2',
                  username: 'sara***@email.com',
                  purchasedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString()
            },
            {
                  rank: 3,
                  userId: 'u3',
                  username: 'mike***@email.com',
                  purchasedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
            },
            {
                  rank: 4,
                  userId: 'u4',
                  username: 'emma***@email.com',
                  purchasedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString()
            },
            {
                  rank: 5,
                  userId: 'u5',
                  username: 'alex***@email.com',
                  purchasedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
            }
      ],
      total: 57,
      page: 1,
      limit: 10
};

const USE_MOCK = false; // Toggle for development

export const saleService = {
      async getStatus(productId?: string): Promise<{ data?: SaleStatus; error?: unknown }> {
            if (USE_MOCK) {
                  // ... mock logic ...
                  return { data: { ...MOCK_SALE_STATUS } };
            }
            const url = productId ? `/flash-sales/product/${productId}` : '/flash-sales/active';
            const response = await api<{ data: SaleStatus }>(url);
            return { data: response.data?.data, error: response.error };
      },

      async purchase(saleId: string, productId: string): Promise<{ data?: PurchaseResponse; error?: unknown }> {
            if (USE_MOCK) {
                  // ... mock logic ...
            }
            const response = await api<{
                  status: string;
                  message: string;
                  data: {
                        purchase: {
                              _id: string;
                              purchasedAt: string;
                              productId: string;
                              userId: string;
                              price: number;
                        };
                  };
            }>(`/flash-sales/${saleId}/purchase`, { productId });

            return {
                  data: response.data
                        ? {
                                success: response.data.status === 'success',
                                message: response.data.message,
                                orderId: response.data.data?.purchase?._id,
                                purchasedAt: response.data.data?.purchase?.purchasedAt
                          }
                        : undefined,
                  error: response.error
            };
      },

      async getLeaderboard(
            saleId: string,
            page = 1,
            limit = 10
      ): Promise<{ data?: LeaderboardResponse; error?: unknown }> {
            if (USE_MOCK) {
                  await new Promise(resolve => setTimeout(resolve, 200));
                  return { data: MOCK_LEADERBOARD };
            }
            const response = await api<{ data: LeaderboardResponse }>(
                  `/flash-sales/${saleId}/leaderboard?page=${page}&limit=${limit}`
            );
            return { data: response.data?.data, error: response.error };
      }
};
