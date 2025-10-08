import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WarehouseDetail, CreateWarehouseRequest, UpdateWarehouseRequest } from '../../services/warehouse/warehouse.types';

export const WarehouseActions = createActionGroup({
  source: 'Warehouse',
  events: {
    'Load Warehouses': emptyProps(),
    'Load Warehouses Success': props<{ warehouses: WarehouseDetail[] }>(),
    'Load Warehouses Failure': props<{ error: string }>(),

    'Load Warehouse': props<{ id: number }>(),
    'Load Warehouse Success': props<{ warehouse: WarehouseDetail }>(),
    'Load Warehouse Failure': props<{ error: string }>(),

    'Create Warehouse': props<{ request: CreateWarehouseRequest }>(),
    'Create Warehouse Success': props<{ warehouse: WarehouseDetail }>(),
    'Create Warehouse Failure': props<{ error: string }>(),

    'Update Warehouse': props<{ id: number; request: UpdateWarehouseRequest }>(),
    'Update Warehouse Success': props<{ warehouse: WarehouseDetail }>(),
    'Update Warehouse Failure': props<{ error: string }>(),

    'Delete Warehouse': props<{ id: number }>(),
    'Delete Warehouse Success': props<{ id: number }>(),
    'Delete Warehouse Failure': props<{ error: string }>(),
  },
});
