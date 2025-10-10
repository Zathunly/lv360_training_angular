// src/app/core/store/product/product.state.ts
import { ProductListItem } from '../../services/api/product/product.types';

// State interface
export interface ProductState {
  products: ProductListItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

