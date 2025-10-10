import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StockService } from '../../services/api/stock/stock.service';
import { StockActions } from './stock.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class StockEffects {
  constructor(private actions$: Actions, private stockService: StockService) {}

  loadStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.loadStocks),
      mergeMap(() =>
        this.stockService.getAll().pipe(
          map(stocks => StockActions.loadStocksSuccess({ stocks })),
          catchError(error =>
            of(StockActions.loadStocksFailure({ error: error.message || 'Failed to load stocks' }))
          )
        )
      )
    )
  );

  createStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.createStock),
      mergeMap(({ request }) =>
        this.stockService.create(request).pipe(
          map(stock => StockActions.createStockSuccess({ stock })),
          catchError(error =>
            of(StockActions.createStockFailure({ error: error.message || 'Failed to create stock' }))
          )
        )
      )
    )
  );

  updateStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.updateStock),
      mergeMap(({ id, request }) =>
        this.stockService.update(id, request).pipe(
          map(stock => StockActions.updateStockSuccess({ stock })),
          catchError(error =>
            of(StockActions.updateStockFailure({ error: error.message || 'Failed to update stock' }))
          )
        )
      )
    )
  );

  deleteStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.deleteStock),
      mergeMap(({ id }) =>
        this.stockService.delete(id).pipe(
          map(() => StockActions.deleteStockSuccess({ id })),
          catchError(error =>
            of(StockActions.deleteStockFailure({ error: error.message || 'Failed to delete stock' }))
          )
        )
      )
    )
  );

  updateStockBulk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.updateStockBulk),
      mergeMap(action =>
        this.stockService.updateBulk(action.stocks).pipe(
          map(stocks => StockActions.updateStockBulkSuccess({ stocks })),
          catchError(error => of(StockActions.updateStockBulkFailure({ error })))
        )
      )
    )
  );

  deleteStockBulk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.deleteStockBulk),
      mergeMap(action =>
        this.stockService.deleteBulk(action.ids).pipe(
          map(() => StockActions.deleteStockBulkSuccess({ ids: action.ids })),
          catchError(error => of(StockActions.deleteStockBulkFailure({ error })))
        )
      )
    )
  );
}
