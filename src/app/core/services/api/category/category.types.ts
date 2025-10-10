// Common types (only what the API actually returns/accepts)

export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryRequest {
  categoryId: number;
}

export interface UpdateCategoryRequest {
  categoryId: number;
}
