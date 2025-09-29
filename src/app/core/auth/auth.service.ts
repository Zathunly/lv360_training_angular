import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth'; 

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  checkSession() {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
