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
