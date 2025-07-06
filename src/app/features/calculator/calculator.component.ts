import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorService, BonoInput } from './calculator.service';

interface CashFlow {
  period: number;
  paymentDate: string;
  interest: number;
  amortization: number;
  totalPayment: number;
  remainingDebt: number;
}

@Component({
  standalone: true,
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  bono: BonoInput = {
    name: '',
    nominalValue: 1000,
    commercialValue: 950,
    years: 3,
    paymentsPerYear: 2,
    couponRate: 0.1,
    redemptionPremium: 0.02,
    isEffectiveRate: false,
    nominalRate: 0.12,
    capitalizationDays: 180,
    currency: 'PEN',
    structuringCost: 0.01,
    placementCost: 0.02,
    flotationCost: 0.01,
    cavaliCost: 0,
    totalGracePeriods: 1,
    partialGracePeriods: 1,
    marketRate: 0.09,
    startDate: '2025-08-01'
  };

  cashFlows: CashFlow[] = [];
  calculado = false;

  constructor(private calcService: CalculatorService) {}

  calcular() {
    this.calcService.enviarDatosCalculo(this.bono).subscribe((res) => {
      if (res.success) {
        this.cashFlows = res.cashFlows;
        this.calculado = true;
      } else {
        console.error('Error al calcular bono');
      }
    });
  }
}
