import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'accessToken';
  private readonly apiUrl = 'https://localhost:7062/api/v1/authentication';

  constructor(private http: HttpClient) {}

  // ✅ Login real con backend
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/sign-in`, { username, password }).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
      }),
      map(res => !!res.token)
    );
  }

  // ✅ Registro real
  register(username: string, email: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, {
      username,
      password,
      role: 'TRANSMITTER' // o 'Admin', según lo que tu sistema permita
    }).pipe(
      map(() => ({ success: true }))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
