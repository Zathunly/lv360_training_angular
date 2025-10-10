import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  WarehouseDetail,
  CreateWarehouseRequest,
  UpdateWarehouseRequest,
} from './warehouse.types';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private baseUrl = environment.apiUrl;
  private warehouseEndpoint = `${this.baseUrl}/warehouse`; 
  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<WarehouseDetail[]> {
    return this.http.get<WarehouseDetail[]>(this.warehouseEndpoint);
  }

  getWarehouseById(id: number): Observable<WarehouseDetail> {
    return this.http.get<WarehouseDetail>(`${this.warehouseEndpoint}/${id}`);
  }

  createWarehouse(req: CreateWarehouseRequest): Observable<WarehouseDetail> {
    return this.http.post<WarehouseDetail>(this.warehouseEndpoint, req);
  }

  updateWarehouse(id: number, req: UpdateWarehouseRequest): Observable<WarehouseDetail> {
    return this.http.put<WarehouseDetail>(`${this.warehouseEndpoint}/${id}`, req);
  }

  deleteWarehouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.warehouseEndpoint}/${id}`);
  }
}
