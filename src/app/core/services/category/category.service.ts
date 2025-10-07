import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from './category.types';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = environment.apiUrl;
  private categoryEndpoint = `${this.baseUrl}/category`; 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryEndpoint, { withCredentials: true });
  }

  addCategory(category: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.categoryEndpoint, category, { withCredentials: true });
  }

  updateCategory(id: number, category: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.categoryEndpoint}/${id}`, category, { withCredentials: true });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoryEndpoint}/${id}`, { withCredentials: true });
  }
}
