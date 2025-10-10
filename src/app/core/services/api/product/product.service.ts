// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { catchError, map, of } from 'rxjs';
// Import DTOs
import { 
  ProductListItem, 
  ProductDetail, 
  CreateProductRequest, 
  UpdateProductRequest 
} from './product.types';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl;
  private productsEndpoint = `${this.baseUrl}/product`;

  constructor(private http: HttpClient) {}
  
  exists(id: number) {
    return this.getProductById(id).pipe(
      map((res: ProductDetail) => !!res), 
      catchError(() => of(false)) 
    );
  }
  
  getProducts(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(this.productsEndpoint);
  }

  getProductById(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.productsEndpoint}/${id}`);
  }

  addProduct(product: CreateProductRequest): Observable<ProductDetail> {
    return this.http.post<ProductDetail>(this.productsEndpoint, product);
  }

  updateProduct(id: number, product: UpdateProductRequest): Observable<ProductDetail> {
    return this.http.put<ProductDetail>(`${this.productsEndpoint}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsEndpoint}/${id}`);
  }

  addProductsBulk(products: CreateProductRequest[]): Observable<ProductDetail[]> {
    return this.http.post<ProductDetail[]>(`${this.productsEndpoint}/bulk`, products);
  }

  updateProductsBulk(products: UpdateProductRequest[]): Observable<ProductDetail[]> {
    return this.http.put<ProductDetail[]>(`${this.productsEndpoint}/bulk`, products);
  }

  deleteProductsBulk(ids: number[]): Observable<{ deleted: number }> {
    return this.http.request<{ deleted: number }>('delete', `${this.productsEndpoint}/bulk`, {
      body: ids
    });
  }
}

