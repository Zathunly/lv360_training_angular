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

    'Add Products Bulk': props<{ products: CreateProductRequest[] }>(),
    'Add Products Bulk Success': props<{ products: ProductListItem[] }>(),
    'Add Products Bulk Failure': props<{ error: string }>(),

    'Update Products Bulk': props<{ products: UpdateProductRequest[] }>(),
    'Update Products Bulk Success': props<{ products: ProductListItem[] }>(),
    'Update Products Bulk Failure': props<{ error: string }>(),

    'Delete Products Bulk': props<{ ids: number[] }>(),
    'Delete Products Bulk Success': props<{ deleted: number }>(),
    'Delete Products Bulk Failure': props<{ error: string }>(),
  },
});
