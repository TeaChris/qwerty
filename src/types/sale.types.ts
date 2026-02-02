// Flash Sale Types

export type SaleStatusType = 'upcoming' | 'live' | 'sold_out';

export interface SaleStatus {
      productId: string;
      productName: string;
      productImage: string;
      status: SaleStatusType;
      startsAt: string;
      endsAt: string;
      totalStock: number;
      remainingStock: number;
      priceAmount: number;
      priceCurrency: string;
}

export interface PurchaseResponse {
      success: boolean;
      message: string;
      orderId?: string;
      purchasedAt?: string;
}

export interface LeaderboardEntry {
      rank: number;
      userId: string;
      username: string;
      purchasedAt: string;
}

export interface LeaderboardResponse {
      entries: LeaderboardEntry[];
      total: number;
      page: number;
      limit: number;
}

// Auth Types
export interface User {
      id: string;
      email: string;
      username: string;
}

export interface LoginRequest extends Record<string, unknown> {
      email: string;
      password: string;
}

export interface LoginResponse {
      token: string;
      user: User;
}
