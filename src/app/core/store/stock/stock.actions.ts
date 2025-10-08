import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StockDetail, CreateStockRequest, UpdateStockRequest } from '../../../core/services/stock/stock.types';

export const StockActions = createActionGroup({
  source: 'Stock',
  events: {
    'Load Stocks': emptyProps(),
    'Load Stocks Success': props<{ stocks: StockDetail[] }>(),
    'Load Stocks Failure': props<{ error: any }>(),

    'Create Stock': props<{ request: CreateStockRequest }>(),
    'Create Stock Success': props<{ stock: StockDetail }>(),
    'Create Stock Failure': props<{ error: any }>(),

    'Update Stock': props<{ id: number; request: UpdateStockRequest }>(),
    'Update Stock Success': props<{ stock: StockDetail }>(),
    'Update Stock Failure': props<{ error: any }>(),

    'Delete Stock': props<{ id: number }>(),
    'Delete Stock Success': props<{ id: number }>(),
    'Delete Stock Failure': props<{ error: any }>(),
  },
});
