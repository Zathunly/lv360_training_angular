import { createReducer, on } from '@ngrx/store';
import { StockActions } from './stock.actions';
import { initialState } from './stock.state';

export const stockReducer = createReducer(
  initialState,

  on(StockActions.loadStocks, state => ({ ...state, loading: true })),
  on(StockActions.loadStocksSuccess, (state, { stocks }) => ({
    ...state,
    loading: false,
    stocks,
  })),
  on(StockActions.loadStocksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StockActions.createStockSuccess, (state, { stock }) => ({
    ...state,
    stocks: [...state.stocks, stock],
  })),

  on(StockActions.updateStockSuccess, (state, { stock }) => ({
    ...state,
    stocks: state.stocks.map(s => (s.id === stock.id ? stock : s)),
  })),

  on(StockActions.deleteStockSuccess, (state, { id }) => ({
    ...state,
    stocks: state.stocks.filter(s => s.id !== id),
  })),

  on(StockActions.updateStockBulkSuccess, (state, { stocks }) => ({
    ...state,
    stocks: state.stocks.map(s => {
      const updated = stocks.find(u => u.id === s.id);
      return updated ? updated : s;
    })
  })),
  on(StockActions.updateStockBulkFailure, (state, { error }) => ({ ...state, error })),

  on(StockActions.deleteStockBulkSuccess, (state, { ids }) => ({
    ...state,
    stocks: state.stocks.filter(s => !ids.includes(s.id))
  })),
  on(StockActions.deleteStockBulkFailure, (state, { error }) => ({ ...state, error })),
);
