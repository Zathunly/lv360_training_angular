import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product/product.service';
import { ProductActions } from './product.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map(newProduct => ProductActions.addProductSuccess({ product: newProduct })),
          catchError(error => of(ProductActions.addProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ id, changes }) =>
        this.productService.updateProduct(id, changes).pipe(
          map(updated => ProductActions.updateProductSuccess({ product: updated })),
          catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );

  addProductsBulk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductsBulk),
      mergeMap(({ products }) =>
        this.productService.addProductsBulk(products).pipe(
          map(response => ProductActions.addProductsBulkSuccess({ products: response })),
          catchError(error => of(ProductActions.addProductsBulkFailure({ error: error.message })))
        )
      )
    )
  );

  updateProductsBulk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductsBulk),
      mergeMap(({ products }) =>
        this.productService.updateProductsBulk(products).pipe(
          map(response => ProductActions.updateProductsBulkSuccess({ products: response })),
          catchError(error => of(ProductActions.updateProductsBulkFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProductsBulk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductsBulk),
      mergeMap(({ ids }) =>
        this.productService.deleteProductsBulk(ids).pipe(
          map(response => ProductActions.deleteProductsBulkSuccess({ deleted: response.deleted })),
          catchError(error => of(ProductActions.deleteProductsBulkFailure({ error: error.message })))
        )
      )
    )
  );
}
