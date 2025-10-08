import { createReducer, on } from '@ngrx/store';
import { WarehouseActions } from './warehouse.actions';
import { initialState } from './warehouse.state';

export const warehouseReducer = createReducer(
  initialState,

  on(WarehouseActions.loadWarehouses, state => ({ ...state, loading: true })),
  on(WarehouseActions.loadWarehousesSuccess, (state, { warehouses }) => ({
    ...state,
    loading: false,
    warehouses,
  })),
  on(WarehouseActions.loadWarehousesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(WarehouseActions.loadWarehouse, state => ({ ...state, loading: true })),
  on(WarehouseActions.loadWarehouseSuccess, (state, { warehouse }) => ({
    ...state,
    loading: false,
    selectedWarehouse: warehouse,
  })),
  on(WarehouseActions.loadWarehouseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(WarehouseActions.createWarehouse, state => ({ ...state, loading: true })),
  on(WarehouseActions.createWarehouseSuccess, (state, { warehouse }) => ({
    ...state,
    loading: false,
    warehouses: [...state.warehouses, warehouse],
  })),
  on(WarehouseActions.createWarehouseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(WarehouseActions.updateWarehouse, state => ({ ...state, loading: true })),
  on(WarehouseActions.updateWarehouseSuccess, (state, { warehouse }) => ({
    ...state,
    loading: false,
    warehouses: state.warehouses.map(w => (w.id === warehouse.id ? warehouse : w)),
  })),
  on(WarehouseActions.updateWarehouseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(WarehouseActions.deleteWarehouse, state => ({ ...state, loading: true })),
  on(WarehouseActions.deleteWarehouseSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    warehouses: state.warehouses.filter(w => w.id !== id),
  })),
  on(WarehouseActions.deleteWarehouseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
