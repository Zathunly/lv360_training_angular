import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WarehouseState } from './warehouse.state';

export const selectWarehouseState = createFeatureSelector<WarehouseState>('warehouses');

export const selectAllWarehouses = createSelector(
  selectWarehouseState,
  state => state.warehouses
);

export const selectWarehouseLoading = createSelector(
  selectWarehouseState,
  state => state.loading
);

export const selectWarehouseError = createSelector(
  selectWarehouseState,
  state => state.error
);

export const selectSelectedWarehouse = createSelector(
  selectWarehouseState,
  state => state.selectedWarehouse
);
