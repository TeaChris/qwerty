import { api } from '../lib/use.api';

// ============ Product APIs ============

export interface Product {
      _id: string;
      name: string;
      description: string;
      price: number;
      compareAtPrice?: number;
      stock: number;
      images: string[];
      category: string;
      tags: string[];
      isActive: boolean;
      createdBy: string;
      createdAt: string;
      updatedAt: string;
}

export interface ProductsResponse {
      status: string;
      data: {
            products: Product[];
            pagination: {
                  page: number;
                  limit: number;
                  total: number;
                  pages: number;
            };
      };
}

export interface CreateProductRequest {
      name: string;
      description: string;
      price: number;
      compareAtPrice?: number;
      stock: number;
      images?: string[];
      category: string;
      tags?: string[];
}

export const getProducts = async (
      page = 1,
      limit = 10,
      filters?: { category?: string; search?: string; isActive?: boolean }
) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters?.category && { category: filters.category }),
            ...(filters?.search && { search: filters.search }),
            ...(filters?.isActive !== undefined && { isActive: filters.isActive.toString() })
      });

      return api<ProductsResponse>(`/products?${params}`);
};

export const createProduct = async (data: CreateProductRequest) => {
      return api<{ status: string; message: string; data: { product: Product } }>('/products', {
            method: 'POST',
            body: data
      });
};

export const updateProduct = async (id: string, data: Partial<CreateProductRequest>) => {
      return api<{ status: string; message: string; data: { product: Product } }>(`/products/${id}`, {
            method: 'PUT',
            body: data
      });
};

export const deleteProduct = async (id: string) => {
      return api<{ status: string; message: string }>(`/products/${id}`, {
            method: 'DELETE'
      });
};

// ============ Flash Sale APIs ============

export interface FlashSale {
      _id: string;
      title: string;
      description: string;
      products: Array<{
            productId: string;
            salePrice: number;
            stockLimit: number;
            stockRemaining: number;
      }>;
      startTime: string;
      endTime: string;
      duration: number;
      isActive: boolean;
      status: 'scheduled' | 'active' | 'ended' | 'cancelled';
      createdBy: string;
      createdAt: string;
      updatedAt: string;
}

export interface CreateFlashSaleRequest {
      title: string;
      description: string;
      products: Array<{
            productId: string;
            salePrice: number;
            stockLimit: number;
      }>;
      startTime: string;
      endTime: string;
      duration: number;
}

export const getFlashSales = async (page = 1, limit = 10, status?: string) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(status && { status })
      });

      return api<{ status: string; data: { flashSales: FlashSale[] } }>(`/flash-sales?${params}`);
};

export const getActiveFlashSales = async () => {
      return api<{ status: string; data: { flashSales: FlashSale[] } }>('/flash-sales/active');
};

export const createFlashSale = async (data: CreateFlashSaleRequest) => {
      return api<{ status: string; message: string; data: { flashSale: FlashSale } }>('/flash-sales', {
            method: 'POST',
            body: data
      });
};

export const activateFlashSale = async (id: string) => {
      return api<{ status: string; message: string }>(`/flash-sales/${id}/activate`, {
            method: 'PATCH'
      });
};

export const deactivateFlashSale = async (id: string) => {
      return api<{ status: string; message: string }>(`/flash-sales/${id}/deactivate`, {
            method: 'PATCH'
      });
};

// ============ Admin APIs ============

export interface DashboardStats {
      totalUsers: number;
      newUsersThisWeek: number;
      totalProducts: number;
      activeFlashSales: number;
      totalFlashSales: number;
}

export const getDashboardStats = async () => {
      return api<{ status: string; data: { stats: DashboardStats } }>('/admin/dashboard/stats');
};

export interface AdminUser {
      _id: string;
      username: string;
      email: string;
      role: 'ADMIN' | 'USER';
      isSuspended: boolean;
      isVerified: boolean;
      createdAt: string;
}

export const getAllUsers = async (page = 1, limit = 20, search?: string) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && { search })
      });

      return api<{ status: string; data: { users: AdminUser[] } }>(`/admin/users?${params}`);
};

export const suspendUser = async (id: string) => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/suspend`, {
            method: 'PATCH'
      });
};

export const unsuspendUser = async (id: string) => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/unsuspend`, {
            method: 'PATCH'
      });
};

export const updateUserRole = async (id: string, role: 'ADMIN' | 'USER') => {
      return api<{ status: string; message: string }>(`/admin/users/${id}/role`, {
            method: 'PATCH',
            body: { role }
      });
};
