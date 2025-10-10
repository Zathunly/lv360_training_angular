import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StockDetail, CreateStockRequest, UpdateStockRequest, UpdateStockBulkRequest } from '../../../core/services/api/stock/stock.types';

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

    'Update Stock Bulk': props<{ stocks: UpdateStockBulkRequest[] }>(),
    'Update Stock Bulk Success': props<{ stocks: StockDetail[] }>(),
    'Update Stock Bulk Failure': props<{ error: any }>(),

    'Delete Stock Bulk': props<{ ids: number[] }>(),
    'Delete Stock Bulk Success': props<{ ids: number[] }>(),
    'Delete Stock Bulk Failure': props<{ error: any }>(),
  },
});
