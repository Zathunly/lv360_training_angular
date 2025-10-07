import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ProductListItem, CreateProductRequest, UpdateProductRequest } from '../../services/product/product.types';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: ProductListItem[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    'Add Product': props<{ product: CreateProductRequest }>(),
    'Add Product Success': props<{ product: ProductListItem }>(),
    'Add Product Failure': props<{ error: string }>(),

    'Update Product': props<{ id: number; changes: UpdateProductRequest }>(),
    'Update Product Success': props<{ product: ProductListItem }>(),
    'Update Product Failure': props<{ error: string }>(),

    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});
