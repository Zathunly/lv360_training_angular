// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { categoryReducer } from './core/store/category/category.reducer';
import { CategoryEffects } from './core/store/category/category.effects';
import { productReducer } from './core/store/product/product.reducer';
import { ProductEffects } from './core/store/product/product.effects';
import { warehouseReducer } from './core/store/warehouse/warehouse.reducer';
import { stockReducer } from './core/store/stock/stock.reducer';
import { WarehouseEffects } from './core/store/warehouse/warehouse.effects';
import { StockEffects } from './core/store/stock/stock.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),

    provideStore({ warehouses: warehouseReducer, stocks: stockReducer, categories: categoryReducer, products: productReducer }),
    provideEffects([WarehouseEffects, StockEffects, CategoryEffects, ProductEffects]),
    provideStoreDevtools(),
  ]
};
