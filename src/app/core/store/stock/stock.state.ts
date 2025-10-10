import { StockDetail } from '../../../core/services/api/stock/stock.types';

export interface StockState {
  stocks: StockDetail[];
  loading: boolean;
  error: any;
}

export const initialState: StockState = {
  stocks: [],
  loading: false,
  error: null,
};
