import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import type { Asset } from '../types';
import { getAssets } from '../services';
import type { CreateFlashSaleRequest } from '../types';

export const useFlashSaleForm = () => {
      const [assets, setAssets] = useState<Asset[]>([]);
      const [formData, setFormData] = useState<CreateFlashSaleRequest>({
            title: '',
            description: '',
            assets: [],
            startTime: '',
            endTime: '',
            duration: 60
      });
      const [selectedAsset, setSelectedAsset] = useState<string>('');
      const [submitting, setSubmitting] = useState<boolean>(false);
      const [stockLimit, setStockLimit] = useState<number>(0);
      const [salePrice, setSalePrice] = useState<number>(0);

      // Fetch assets on mount
      useEffect(() => {
            const fetchAssets = async () => {
                  const { data } = await getAssets(1, 100);
                  if (data) {
                        setAssets(data.data.assets);
                  }
            };
            fetchAssets();
      }, []);

      const addAsset = () => {
            if (!selectedAsset || salePrice <= 0 || stockLimit <= 0) {
                  toast.error('Please fill in all asset details');
                  return;
            }

            setFormData(prev => ({
                  ...prev,
                  assets: [
                        ...prev.assets,
                        {
                              assetId: selectedAsset,
                              salePrice,
                              stockLimit
                        }
                  ]
            }));

            setSelectedAsset('');
            setSalePrice(0);
            setStockLimit(0);
      };

      const removeAsset = (index: number) => {
            setFormData(prev => ({
                  ...prev,
                  assets: prev.assets.filter((_, i) => i !== index)
            }));
      };

      const handleSubmit = async (e: React.FormEvent, onCreate: (data: CreateFlashSaleRequest) => Promise<boolean>) => {
            e.preventDefault();

            if (formData.assets.length === 0) {
                  toast.error('Please add at least one asset to the flash sale');
                  return;
            }

            setSubmitting(true);
            const success = await onCreate(formData);
            setSubmitting(false);

            if (success) {
                  setFormData({
                        title: '',
                        description: '',
                        assets: [],
                        startTime: '',
                        endTime: '',
                        duration: 60
                  });
            }
      };

      return {
            assets,
            formData,
            salePrice,
            stockLimit,
            addAsset,
            submitting,
            setFormData,
            setSalePrice,
            handleSubmit,
            setStockLimit,
            removeAsset,
            setSubmitting,
            selectedAsset,
            setSelectedAsset
      };
};
