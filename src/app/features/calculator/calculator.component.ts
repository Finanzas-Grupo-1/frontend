import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorService, BonoInput } from './calculator.service';

interface AmortizationRow {
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
export class CalculatorComponent implements OnInit {
  // Campos del bono
  name = '';
  nominalValue = 1000;
  commercialValue = 950;
  years = 3;
  paymentsPerYear = 1;
  couponRate = 0.1;
  redemptionPremium = 0.02;
  isEffectiveRate = true;
  nominalRate?: number;
  capitalizationDays?: number;
  currency: 'PEN' | 'USD' = 'PEN';
  structuringCost = 0.01;
  placementCost = 0.02;
  flotationCost = 0.01;
  cavaliCost = 0;
  totalGracePeriods = 0;
  partialGracePeriods = 0;
  marketRate = 0.09;
  startDate = new Date().toISOString().split('T')[0];

  // Campos derivados de configuración
  tipoTasa: 'efectiva' | 'nominal' = 'efectiva';
  capitalizacion: string = 'anual';
  moneda: 'PEN' | 'USD' = 'PEN';

  cashFlows: AmortizationRow[] = [];
  calculado = false;

  constructor(private calcService: CalculatorService) {}

  ngOnInit(): void {
    const config = localStorage.getItem('configuracionBono');
    if (config) {
      const parsed = JSON.parse(config);
      this.tipoTasa = parsed.tipoTasa || 'efectiva';
      this.capitalizacion = parsed.capitalizacion || 'anual';
      this.moneda = parsed.moneda || 'PEN';

      // ✅ Aplicar también al bono:
      this.isEffectiveRate = this.tipoTasa === 'efectiva';
      this.currency = this.moneda;
      this.capitalizationDays = this.tipoTasa === 'nominal' ? this.capitalizacionADias(this.capitalizacion) : undefined;
    }
  }

  calcular() {
    const bono: BonoInput = {
      name: this.name || `Bono generado ${new Date().toLocaleDateString()}`,
      nominalValue: this.nominalValue,
      commercialValue: this.commercialValue,
      years: this.years,
      paymentsPerYear: this.paymentsPerYear,
      couponRate: this.couponRate,
      redemptionPremium: this.redemptionPremium,
      isEffectiveRate: this.tipoTasa === 'efectiva',
      nominalRate: this.tipoTasa === 'nominal' ? this.nominalRate : undefined,
      capitalizationDays: this.tipoTasa === 'nominal' ? this.capitalizacionADias(this.capitalizacion) : undefined,
      currency: this.moneda,
      structuringCost: this.structuringCost,
      placementCost: this.placementCost,
      flotationCost: this.flotationCost,
      cavaliCost: this.cavaliCost,
      totalGracePeriods: this.totalGracePeriods,
      partialGracePeriods: this.partialGracePeriods,
      marketRate: this.marketRate,
      startDate: this.startDate
    };

    this.calcService.enviarDatosCalculo(bono).subscribe(res => {
      if (res.success) {
        this.cashFlows = res.cashFlows;
        this.calculado = true;
      } else {
        console.error('❌ Error al calcular el bono.');
      }
    });
  }

  private capitalizacionADias(tipo: string): number {
    switch (tipo) {
      case 'diaria': return 1;
      case 'mensual': return 30;
      case 'bimestral': return 60;
      case 'trimestral': return 90;
      case 'cuatrimestral': return 120;
      case 'semestral': return 180;
      case 'anual': return 360;
      default: return 360;
    }
  }
}
