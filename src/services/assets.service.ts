// Asset APIs

import { api } from '../lib';
import type { CreateAssetRequest, Asset, AssetsResponse } from '../types/assets';

export const getAssets = async (
      page = 1,
      limit = 10,
      filter?: { category?: string; search?: string; isActive?: boolean; assetType?: string }
) => {
      const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filter?.search && { search: filter.search }),
            ...(filter?.category && { category: filter.category }),
            ...(filter?.assetType && { assetType: filter.assetType }),
            ...(filter?.isActive !== undefined && { isActive: filter.isActive.toString() })
      });

      return api<AssetsResponse>(`/assets?${params}`);
};

export const createAsset = async (data: CreateAssetRequest) => {
      return api<{ status: string; message: string; data: { asset: Asset } }>('/assets', data);
};

export const updateAsset = async (id: string, data: Partial<CreateAssetRequest>) => {
      return api<{ status: string; message: string; data: { asset: Asset } }>(`/assets/${id}`, data, 'PUT');
};

export const deleteAsset = async (id: string) => {
      return api<{ status: string; message: string }>(`/assets/${id}`, {
            method: 'DELETE'
      });
};
