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

const USE_MOCK = true; // Toggle for development

export const saleService = {
      async getStatus(): Promise<{ data?: SaleStatus; error?: unknown }> {
            if (USE_MOCK) {
                  // Simulate network delay
                  await new Promise(resolve => setTimeout(resolve, 300));
                  // Simulate stock decreasing
                  MOCK_SALE_STATUS.remainingStock = Math.max(
                        0,
                        MOCK_SALE_STATUS.remainingStock - Math.floor(Math.random() * 2)
                  );
                  if (MOCK_SALE_STATUS.remainingStock === 0) {
                        MOCK_SALE_STATUS.status = 'sold_out';
                  }
                  return { data: { ...MOCK_SALE_STATUS } };
            }
            return api<SaleStatus>('/sale/status');
      },

      async purchase(): Promise<{ data?: PurchaseResponse; error?: unknown }> {
            if (USE_MOCK) {
                  await new Promise(resolve => setTimeout(resolve, 800));
                  // 90% success rate for demo
                  if (Math.random() > 0.1) {
                        MOCK_SALE_STATUS.remainingStock = Math.max(0, MOCK_SALE_STATUS.remainingStock - 1);
                        return {
                              data: {
                                    success: true,
                                    message: 'Purchase successful!',
                                    orderId: `ORD_${Date.now()}`,
                                    purchasedAt: new Date().toISOString()
                              }
                        };
                  }
                  return {
                        data: {
                              success: false,
                              message: 'Out of stock'
                        }
                  };
            }
            return api<PurchaseResponse>('/sale/purchase', {});
      },

      async getLeaderboard(page = 1, limit = 10): Promise<{ data?: LeaderboardResponse; error?: unknown }> {
            if (USE_MOCK) {
                  await new Promise(resolve => setTimeout(resolve, 200));
                  return { data: MOCK_LEADERBOARD };
            }
            return api<LeaderboardResponse>(`/sale/leaderboard?page=${page}&limit=${limit}`);
      }
};
