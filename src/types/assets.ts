export type AssetType = 'event_pass' | 'identity_badge' | 'smart_device' | 'intel_report';

export interface Asset {
      _id: string;
      name: string;
      description: string;
      price: number;
      compareAtPrice?: number;
      stock: number;
      images: string[];
      category: string;
      assetType: AssetType;
      tags: string[];
      isActive: boolean;
      accessDetails?: string;
      editionInfo?: string;
      metadata?: Record<string, unknown>;
      createdBy: string;
      createdAt: string;
      updatedAt: string;
}

export interface AssetsResponse {
      status: string;
      data: {
            assets: Asset[];
            pagination: {
                  page: number;
                  limit: number;
                  total: number;
                  pages: number;
            };
      };
}

export interface CreateAssetRequest {
      name: string;
      description: string;
      price: number;
      compareAtPrice?: number;
      stock: number;
      images?: string[];
      category: string;
      assetType: AssetType;
      tags?: string[];
      accessDetails?: string;
      editionInfo?: string;
      metadata?: Record<string, unknown>;
}
