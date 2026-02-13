// products APIs

import { api } from '../lib';
import type { CreateProductRequest, Product, ProductsResponse } from '../types/products';

export const getProducts = async (
      page = 1,
      limit = 10,
      filter?: { category?: string; search?: string; isActive?: boolean }
) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filter?.search && { search: filter.search }),
            ...(filter?.category && { category: filter.category }),
            ...(filter?.isActive !== undefined && { isActive: filter.isActive.toString() })
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
