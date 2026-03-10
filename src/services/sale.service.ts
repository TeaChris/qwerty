import { api } from '../lib/use.api';
import type { SaleStatus, PurchaseResponse, LeaderboardResponse } from '../types/sale.types';

export const saleService = {
      async getStatus(assetId?: string): Promise<{ data?: SaleStatus; error?: unknown }> {
            const url = assetId ? `/flash-sales/asset/${assetId}` : '/flash-sales/active';
            const response = await api<{ data: SaleStatus }>(url);
            return { data: response.data?.data, error: response.error };
      },

      async purchase(saleId: string, assetId: string): Promise<{ data?: PurchaseResponse; error?: unknown }> {
            const response = await api<{
                  status: string;
                  message: string;
                  data: {
                        purchase: {
                              _id: string;
                              assetId: string;
                              userId: string;
                              price: number;
                              status: string;
                              paymentReference: string;
                        };
                        authorization_url: string;
                  };
            }>(`/flash-sales/${saleId}/purchase`, { assetId });

            return {
                  data: response.data
                        ? {
                                success: response.data.status === 'success',
                                message: response.data.message,
                                orderId: response.data.data?.purchase?._id,
                                authorizationUrl: response.data.data?.authorization_url,
                                paymentReference: response.data.data?.purchase?.paymentReference
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
            const response = await api<{ data: LeaderboardResponse }>(
                  `/flash-sales/${saleId}/leaderboard?page=${page}&limit=${limit}`
            );
            return { data: response.data?.data, error: response.error };
      }
};
