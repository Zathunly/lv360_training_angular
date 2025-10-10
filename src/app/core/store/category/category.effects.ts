// src/app/core/store/category/category.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../services/api/category/category.service';
import { CategoryActions } from './category.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable() 
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.addCategory),
      mergeMap(({ category }) =>
        this.categoryService.addCategory(category).pipe(
          map(newCategory => CategoryActions.addCategorySuccess({ category: newCategory })),
          catchError(error => of(CategoryActions.addCategoryFailure({ error })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap(({ id, category }) =>
        this.categoryService.updateCategory(id, category).pipe(
          map(updated => CategoryActions.updateCategorySuccess({ category: updated })),
          catchError(error => of(CategoryActions.updateCategoryFailure({ error })))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap(({ id }) =>
        this.categoryService.deleteCategory(id).pipe(
          map(() => CategoryActions.deleteCategorySuccess({ id })),
          catchError(error => of(CategoryActions.deleteCategoryFailure({ error })))
        )
      )
    )
  );
}
