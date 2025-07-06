import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInFlag = false;
  private tokenKey = 'loggedIn';
  private apiUrl = 'http://localhost:3000/api/auth'; // cambiar cuando tengas backend

  constructor(private http: HttpClient) {}

  // ✅ Login simulado (actual) + preparado para backend
  login(username: string, password: string): Observable<boolean> {
    // 👇 Reemplazar por llamada real cuando esté listo el backend
    if (username === 'admin' && password === 'admin123') {
      this.isLoggedInFlag = true;
      localStorage.setItem(this.tokenKey, 'true');
      return of(true);
    }

    return of(false);

    // 🔄 Futuro backend:
    /*
    return this.http.post<{ success: boolean, token?: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          if (res.success && res.token) {
            localStorage.setItem(this.tokenKey, res.token);
            this.isLoggedInFlag = true;
          }
        }),
        map(res => res.success)
      );
    */
  }

  // ✅ Registro simulado
  register(username: string, email: string, password: string): Observable<{ success: boolean }> {
    // Simulación por ahora
    console.log('Registro simulado:', { username, email, password });
    return of({ success: true });

    // 🔄 Futuro backend:
    /*
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/register`, {
      username, email, password
    });
    */
  }

  // Logout
  logout() {
    this.isLoggedInFlag = false;
    localStorage.removeItem(this.tokenKey);
  }

  // Estado de sesión
  isLoggedIn(): boolean {
    return this.isLoggedInFlag || localStorage.getItem(this.tokenKey) === 'true';
  }
}
