import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import { useAuthStore } from '../stores';
import type { Asset, CreateAssetRequest } from '../types';
import { getAssets, createAsset, deleteAsset } from '../services';

export const useAdminAssets = () => {
      const { user } = useAuthStore();
      const [page, setPage] = useState<number>(1);
      const [total, setTotal] = useState<number>(0);
      const [assets, setAssets] = useState<Asset[]>([]);
      const [loadingAssets, setLoadingAssets] = useState<boolean>(true);

      const fetchAssets = useCallback(
            async (showLoading = true) => {
                  if (showLoading) {
                        setLoadingAssets(true);
                  }

                  const { data, error } = await getAssets(page, 10);

                  if (error) {
                        toast.error('Failed to load assets');
                        console.error(error);
                  } else if (data) {
                        setAssets(data.data.assets);
                        setTotal(data.data.pagination.total);
                  }

                  setLoadingAssets(false);
            },
            [page]
      );

      useEffect(() => {
            if (user?.role === 'ADMIN') {
                  // Direct fetch to avoid the "setState in effect" lint
                  getAssets(page, 10).then(({ data, error }) => {
                        if (error) {
                              toast.error('Failed to load assets');
                              console.error(error);
                        } else if (data) {
                              setAssets(data.data.assets);
                              setTotal(data.data.pagination.total);
                        }
                        setLoadingAssets(false);
                  });
            }
      }, [user, page]);

      const handleCreateAsset = async (assetData: CreateAssetRequest) => {
            const { error } = await createAsset(assetData);

            if (error) {
                  toast.error(error.message || 'Failed to create asset');
                  return false;
            }

            toast.success('Asset created successfully!');
            await fetchAssets();
            return true;
      };

      const handleDeleteAsset = async (id: string) => {
            if (!confirm('Are you sure you want to delete this asset?')) return;

            const { error } = await deleteAsset(id);

            if (error) {
                  toast.error(error.message || 'Failed to delete asset');
                  return;
            }

            toast.success('Asset deleted successfully');
            await fetchAssets();
      };

      return {
            page,
            total,
            setPage,
            assets,
            fetchAssets,
            loadingAssets,
            handleCreateAsset,
            handleDeleteAsset
      };
};
