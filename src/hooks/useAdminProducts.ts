import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import { useAuthStore } from '../stores';
import type { Product, CreateProductRequest } from '../types';
import { getProducts, createProduct, deleteProduct } from '../services';

export const useAdminProducts = () => {
      const { user } = useAuthStore();
      const [page, setPage] = useState<number>(1);
      const [total, setTotal] = useState<number>(0);
      const [products, setProducts] = useState<Product[]>([]);
      const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

      const fetchProducts = useCallback(
            async (showLoading = true) => {
                  if (showLoading) {
                        setLoadingProducts(true);
                  }

                  const { data, error } = await getProducts(page, 10);

                  if (error) {
                        toast.error('Failed to load products');
                        console.error(error);
                  } else if (data) {
                        setProducts(data.data.products);
                        setTotal(data.data.pagination.total);
                  }

                  setLoadingProducts(false);
            },
            [page]
      );

      useEffect(() => {
            if (user?.role === 'ADMIN') {
                  // Direct fetch to avoid the "setState in effect" lint
                  getProducts(page, 10).then(({ data, error }) => {
                        if (error) {
                              toast.error('Failed to load products');
                              console.error(error);
                        } else if (data) {
                              setProducts(data.data.products);
                              setTotal(data.data.pagination.total);
                        }
                        setLoadingProducts(false);
                  });
            }
      }, [user, page]);

      const handleCreateProduct = async (productData: CreateProductRequest) => {
            const { error } = await createProduct(productData);

            if (error) {
                  toast.error(error.message || 'Failed to create product');
                  return false;
            }

            toast.success('Product created successfully!');
            await fetchProducts();
            return true;
      };

      const handleDeleteProduct = async (id: string) => {
            if (!confirm('Are you sure you want to delete this product?')) return;

            const { error } = await deleteProduct(id);

            if (error) {
                  toast.error(error.message || 'Failed to delete product');
                  return;
            }

            toast.success('Product deleted successfully');
            await fetchProducts();
      };

      return {
            page,
            total,
            setPage,
            products,
            fetchProducts,
            loadingProducts,
            handleCreateProduct,
            handleDeleteProduct
      };
};
