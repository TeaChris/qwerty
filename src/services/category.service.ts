import { api } from '../lib';
import type { Category, CreateCategoryRequest, CategoriesResponse } from '../types/category';

export const getCategories = async () => {
      return api<CategoriesResponse>('/categories');
};

export const createCategory = async (data: CreateCategoryRequest) => {
      return api<{ status: string; message: string; data: { category: Category } }>('/categories', data);
};

export const deleteCategory = async (id: string) => {
      return api<{ status: string; message: string }>(`/categories/${id}`, {}, 'DELETE');
};
