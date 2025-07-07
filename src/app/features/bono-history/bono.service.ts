import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CashFlow {
  period: number;
  paymentDate: string;
  interest: number;
  amortization: number;
  totalPayment: number;
  remainingDebt: number;
}

export interface BondResource {
  id: number;
  userId: number;
  name: string;
  currency: string;
  years: number;
  couponRate: number;
  marketRate: number;
  startDate: string;
  cashFlows: CashFlow[];
}

@Injectable({ providedIn: 'root' })
export class BonoService {
  private apiUrl = 'https://localhost:7062/api/v1/bonuses';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getHistorial(userId: number): Observable<BondResource[]> {
    return this.http.get<BondResource[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getHeaders()
    });
  }

  eliminarBono(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  eliminarTodos(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}/all`, {
      headers: this.getHeaders()
    });
  }

  saveBono(bono: Partial<BondResource>): Observable<BondResource> {
    return this.http.post<BondResource>(this.apiUrl, bono, {
      headers: this.getHeaders()
    });
  }


}
