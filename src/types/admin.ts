export interface DashboardStats {
      totalUsers: number;
      newUsersThisWeek: number;
      totalProducts: number;
      activeFlashSales: number;
      totalFlashSales: number;
}

export interface AdminUser {
      _id: string;
      username: string;
      email: string;
      role: 'ADMIN' | 'USER';
      isSuspended: boolean;
      isVerified: boolean;
      createdAt: string;
}
