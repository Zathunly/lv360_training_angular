import { Category } from '../../services/api/category/category.types';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: any;
}

export const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};
