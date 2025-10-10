import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState } from './stock.state';

export const selectStockState = createFeatureSelector<StockState>('stocks');

export const selectAllStocks = createSelector(
  selectStockState,
  (state) => state.stocks
);

export const selectStockLoading = createSelector(
  selectStockState,
  (state) => state.loading
);

export const selectStockError = createSelector(
  selectStockState,
  (state) => state.error
);

export const selectStockById = (id: number) => createSelector(
  selectStockState,
  (state: StockState) => state.stocks.find(s => s.id === id)
);
