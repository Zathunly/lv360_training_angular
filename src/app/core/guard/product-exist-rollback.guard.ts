// src/app/core/guards/product-exists.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../store/product/product.selectors';
import { Observable, map, take } from 'rxjs';
import { ProductListItem } from '../services/api/product/product.types';

@Injectable({ providedIn: 'root' })
export class ProductExistsGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (!id) {
      // invalid id format → redirect to blank or list
      this.router.navigate(['/catalog/products']);
      return new Observable(subscriber => subscriber.next(false));
    }

    return this.store.select(selectAllProducts).pipe(
      take(1),
      map((products: ProductListItem[]) => {
        const exists = products.some(p => p.id === id);
        if (!exists) {
          this.router.navigate(['/catalog/products']); 
          return false;
        }
        return true;
      })
    );
  }
}
