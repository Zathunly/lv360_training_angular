import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../../services/api/category/category.types';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Load Categories': emptyProps(),
    'Load Categories Success': props<{ categories: Category[] }>(),
    'Load Categories Failure': props<{ error: any }>(),

    'Add Category': props<{ category: CreateCategoryRequest }>(),
    'Add Category Success': props<{ category: Category }>(),
    'Add Category Failure': props<{ error: any }>(),

    'Update Category': props<{ id: number; category: UpdateCategoryRequest }>(),
    'Update Category Success': props<{ category: Category }>(),
    'Update Category Failure': props<{ error: any }>(),

    'Delete Category': props<{ id: number }>(),
    'Delete Category Success': props<{ id: number }>(),
    'Delete Category Failure': props<{ error: any }>(),
  },
});
