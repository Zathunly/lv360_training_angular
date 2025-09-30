import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  message: string;
  username: string;
  expiresAt: string;
  roles: string[];
}

export interface MeResponse {
  authenticated: boolean;
  username?: string;
  roles: string[];
  expiresAt?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth'; 

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    });
  }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }

  checkSession(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`, {
      withCredentials: true
    });
  }
}
