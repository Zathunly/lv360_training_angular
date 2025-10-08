import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StockDetail, CreateStockRequest, UpdateStockRequest } from './stock.types';

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = environment.apiUrl;
  private stockEndpoint = `${this.baseUrl}/stock`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<StockDetail[]> {
    return this.http.get<StockDetail[]>(this.stockEndpoint);
  }

  getById(id: number): Observable<StockDetail> {
    return this.http.get<StockDetail>(`${this.stockEndpoint}/${id}`);
  }

  create(request: CreateStockRequest): Observable<StockDetail> {
    return this.http.post<StockDetail>(this.stockEndpoint, request);
  }

  update(id: number, request: UpdateStockRequest): Observable<StockDetail> {
    return this.http.put<StockDetail>(`${this.stockEndpoint}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.stockEndpoint}/${id}`);
  }
}
