import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CashFlow {
  period: number;
  paymentDate: string;
  interest: number;
  amortization: number;
  totalPayment: number;
  remainingDebt: number;
}

export interface BonoInput {
  name: string;
  userId?: number;
  nominalValue: number;
  commercialValue: number;
  years: number;
  paymentsPerYear: number;
  couponRate: number;
  redemptionPremium: number;
  isEffectiveRate: boolean;
  nominalRate?: number;
  capitalizationDays?: number;
  currency: 'PEN' | 'USD';
  structuringCost: number;
  placementCost: number;
  flotationCost: number;
  cavaliCost: number;
  totalGracePeriods: number;
  partialGracePeriods: number;
  marketRate: number;
  startDate: string;
}

export interface BondResource {
  id: number;
  userId: number;
  name: string;
  nominalValue: number;
  commercialValue: number;
  years: number;
  paymentsPerYear: number;
  couponRate: number;
  redemptionPremium: number;
  isEffectiveRate: boolean;
  nominalRate?: number;
  capitalizationDays?: number;
  currency: string;
  structuringCost: number;
  placementCost: number;
  flotationCost: number;
  cavaliCost: number;
  totalGracePeriods: number;
  partialGracePeriods: number;
  marketRate: number;
  tcea?: number;
  trea?: number;
  duration?: number;
  modifiedDuration?: number;
  convexity?: number;
  maxPrice?: number;
  startDate: string;
  cashFlows: CashFlow[];
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'https://localhost:7062/api/v1/bonuses';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  enviarDatosCalculo(data: BonoInput): Observable<{ success: boolean; cashFlows: CashFlow[] }> {
    return this.http.post<BondResource>(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      map((response) => ({
        success: true,
        cashFlows: response.cashFlows
      }))
    );
  }

  getHistorialDesdeBackend(userId: number): Observable<BondResource[]> {
    return this.http.get<BondResource[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getHeaders()
    });
  }

  eliminarBonoDesdeBackend(bondId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bondId}`, {
      headers: this.getHeaders()
    });
  }

  limpiarHistorialDesdeBackend(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}/all`, {
      headers: this.getHeaders()
    });
  }

  calcularBono(bono: Partial<BondResource>): Observable<BondResource> {
    return this.http.post<BondResource>(`${this.apiUrl}/calculate`, bono, {
      headers: this.getHeaders()
    });
  }

  guardarBono(bono: Partial<BondResource>): Observable<BondResource> {
    return this.http.post<BondResource>(`${this.apiUrl}`, bono, {
      headers: this.getHeaders()
    });
  }

  obtenerBonoPorId(id: number): Observable<BondResource> {
    return this.http.get<BondResource>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  actualizarBono(id: number, bono: Partial<BondResource>): Observable<BondResource> {
    return this.http.put<BondResource>(`${this.apiUrl}/${id}`, bono, {
      headers: this.getHeaders()
    });
  }
}
