// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
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
}

