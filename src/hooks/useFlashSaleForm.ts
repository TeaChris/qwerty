import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import type { Product } from '../types';
import { getProducts } from '../services';
import type { CreateFlashSaleRequest } from '../types';

export const useFlashSaleForm = () => {
      const [products, setProducts] = useState<Product[]>([]);
      const [formData, setFormData] = useState<CreateFlashSaleRequest>({
            title: '',
            description: '',
            products: [],
            startTime: '',
            endTime: '',
            duration: 60
      });
      const [selectedProduct, setSelectedProduct] = useState<string>('');
      const [submitting, setSubmitting] = useState<boolean>(false);
      const [stockLimit, setStockLimit] = useState<number>(0);
      const [salePrice, setSalePrice] = useState<number>(0);

      // Fetch products on mount
      useEffect(() => {
            const fetchProducts = async () => {
                  const { data } = await getProducts(1, 100);
                  if (data) {
                        setProducts(data.data.products);
                  }
            };
            fetchProducts();
      }, []);

      const addProduct = () => {
            if (!selectedProduct || salePrice <= 0 || stockLimit <= 0) {
                  toast.error('Please fill in all product details');
                  return;
            }

            setFormData(prev => ({
                  ...prev,
                  products: [
                        ...prev.products,
                        {
                              productId: selectedProduct,
                              salePrice,
                              stockLimit
                        }
                  ]
            }));

            setSelectedProduct('');
            setSalePrice(0);
            setStockLimit(0);
      };

      const removeProduct = (index: number) => {
            setFormData(prev => ({
                  ...prev,
                  products: prev.products.filter((_, i) => i !== index)
            }));
      };

      const handleSubmit = async (e: React.FormEvent, onCreate: (data: CreateFlashSaleRequest) => Promise<boolean>) => {
            e.preventDefault();

            if (formData.products.length === 0) {
                  toast.error('Please add at least one product to the flash sale');
                  return;
            }

            setSubmitting(true);
            const success = await onCreate(formData);
            setSubmitting(false);

            if (success) {
                  setFormData({
                        title: '',
                        description: '',
                        products: [],
                        startTime: '',
                        endTime: '',
                        duration: 60
                  });
            }
      };

      return {
            products,
            formData,
            salePrice,
            stockLimit,
            addProduct,
            submitting,
            setFormData,
            setSalePrice,
            handleSubmit,
            setStockLimit,
            removeProduct,
            setSubmitting,
            selectedProduct,
            setSelectedProduct
      };
};
