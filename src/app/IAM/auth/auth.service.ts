import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInFlag = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.isLoggedInFlag = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedInFlag = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInFlag || localStorage.getItem('loggedIn') === 'true';
  }
}
