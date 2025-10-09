import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

// Đây phải khớp với key khi provideStore
export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  state => state?.products ?? []  
);

export const selectProductLoading = createSelector(
  selectProductState,
  state => state?.loading ?? false
);

// optional helper selectors
export const selectProductCount = createSelector(
  selectProductState,
  state => state.products.length
);
