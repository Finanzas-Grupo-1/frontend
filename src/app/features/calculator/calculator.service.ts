import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  userId?: number; // opcional por ahora
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

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'http://localhost:3000/api/calcular-bono'; // cambiar cuando el backend esté disponible

  constructor(private http: HttpClient) {}

  enviarDatosCalculo(data: BonoInput): Observable<{ success: boolean; cashFlows: CashFlow[] }> {
    // 🔄 Simulado por ahora: reemplaza por esta línea cuando conectes al backend:
    // return this.http.post<{ success: boolean; cashFlows: CashFlow[] }>(this.apiUrl, data);

    const cashFlows: CashFlow[] = this.generarAmortizacionLocal(data);
    return of({ success: true, cashFlows });
  }

  private generarAmortizacionLocal(input: BonoInput): CashFlow[] {
    const flows: CashFlow[] = [];
    const totalPeriods = input.years * input.paymentsPerYear;
    const nominal = input.nominalValue;
    const coupon = input.couponRate / input.paymentsPerYear;
    const interestPayment = nominal * coupon;

    for (let i = 1; i <= totalPeriods; i++) {
      const isPartialGrace = i <= input.partialGracePeriods;
      const isTotalGrace = i <= input.totalGracePeriods;

      const interest = isTotalGrace ? 0 : interestPayment;
      const amortization = i === totalPeriods ? nominal * (1 + input.redemptionPremium) : 0;

      const paymentDate = new Date(input.startDate);
      paymentDate.setMonth(paymentDate.getMonth() + (12 / input.paymentsPerYear) * i);

      flows.push({
        period: i,
        paymentDate: paymentDate.toISOString().split('T')[0],
        interest: parseFloat(interest.toFixed(2)),
        amortization: parseFloat(amortization.toFixed(2)),
        totalPayment: parseFloat((interest + amortization).toFixed(2)),
        remainingDebt: i === totalPeriods ? 0 : nominal * (1 + input.redemptionPremium)
      });
    }

    return flows;
  }
}
