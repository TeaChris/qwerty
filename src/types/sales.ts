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
