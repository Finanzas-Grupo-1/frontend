import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

interface CashFlow {
  period: number;
  paymentDate: string;
  interest: number;
  amortization: number;
  totalPayment: number;
  remainingDebt: number;
}

interface Bono {
  id: number;
  name: string;
  currency: string;
  years: number;
  couponRate: number;
  marketRate: number;
  startDate: string;
  cashFlows: CashFlow[];
}

@Component({
  standalone: true,
  selector: 'app-bono-history',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  templateUrl: './bono-history.component.html',
  styleUrls: ['./bono-history.component.css']
})
export class BonoHistoryComponent implements OnInit {
  displayedColumns: string[] = ['expand', 'name', 'currency', 'years', 'couponRate', 'marketRate', 'startDate', 'actions'];
  bonos: Bono[] = [];

  expandedBono: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 🔄 Cargar desde localStorage por ahora
    const raw = localStorage.getItem('bonosHistorial');
    this.bonos = raw ? JSON.parse(raw) : [];

    // ⚙️ Preparado para uso futuro con backend
    // this.bonoService.getBonosByUser(userId).subscribe(data => {
    //   this.bonos = data;
    // });
  }

  toggleExpand(bonoId: number): void {
    this.expandedBono = this.expandedBono === bonoId ? null : bonoId;
  }

  eliminarBono(id: number): void {
    this.bonos = this.bonos.filter(b => b.id !== id);
    localStorage.setItem('bonosHistorial', JSON.stringify(this.bonos));

    // Si el que se expandía fue eliminado, se resetea la expansión
    if (this.expandedBono === id) {
      this.expandedBono = null;
    }
  }

  eliminarTodo(): void {
    this.bonos = [];
    this.expandedBono = null;
    localStorage.removeItem('bonosHistorial');
  }

  editarBono(id: number): void {
    this.router.navigate(['/calculator', id]);
  }

  formatearFecha(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}
