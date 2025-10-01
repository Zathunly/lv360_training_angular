// Common types (only what the API actually returns/accepts)

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
}
