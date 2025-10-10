import { WarehouseDetail } from '../../../core/services/api/warehouse/warehouse.types';

export interface WarehouseState {
  warehouses: WarehouseDetail[];
  selectedWarehouse: WarehouseDetail | null;
  loading: boolean;
  error: string | null;
}

export const initialState: WarehouseState = {
  warehouses: [],
  selectedWarehouse: null,
  loading: false,
  error: null,
};
