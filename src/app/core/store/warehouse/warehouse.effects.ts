import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WarehouseService } from '../../services/warehouse/warehouse.service';
import { WarehouseActions } from './warehouse.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WarehouseEffects {
  constructor(private actions$: Actions, private warehouseService: WarehouseService) {}

    loadWarehouses$ = createEffect(() =>
    this.actions$.pipe(
        ofType(WarehouseActions.loadWarehouses),
        mergeMap(() =>
        this.warehouseService.getWarehouses().pipe(
            map(warehouses => {
            return WarehouseActions.loadWarehousesSuccess({ warehouses });
            }),
            catchError(err =>
            of(WarehouseActions.loadWarehousesFailure({ error: err.message }))
            )
        )
        )
    )
    );

  createWarehouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WarehouseActions.createWarehouse),
      mergeMap(({ request }) =>
        this.warehouseService.createWarehouse(request).pipe(
          map(warehouse => WarehouseActions.createWarehouseSuccess({ warehouse })),
          catchError(err =>
            of(WarehouseActions.createWarehouseFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateWarehouse$ = createEffect(() =>
    this.actions$.pipe(
        ofType(WarehouseActions.updateWarehouse),
        mergeMap(({ id, request }) =>
        this.warehouseService.updateWarehouse(id, request).pipe(
            map(warehouse => WarehouseActions.updateWarehouseSuccess({ warehouse })),
            catchError(err =>
            of(WarehouseActions.updateWarehouseFailure({ error: err.message || 'Failed to update warehouse' }))
            )
        )   
        )
    )
  );


  deleteWarehouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WarehouseActions.deleteWarehouse),
      mergeMap(({ id }) =>
        this.warehouseService.deleteWarehouse(id).pipe(
          map(() => WarehouseActions.deleteWarehouseSuccess({ id })),
          catchError(err =>
            of(WarehouseActions.deleteWarehouseFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
