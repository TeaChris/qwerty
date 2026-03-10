export interface Category {
      _id: string;
      name: string;
      description?: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
}

export interface CreateCategoryRequest {
      name: string;
      description?: string;
}

export interface CategoriesResponse {
      status: string;
      results: number;
      data: {
            categories: Category[];
      };
}
