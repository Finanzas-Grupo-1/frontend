import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BonoService, BondResource } from './bono.service';
import { HttpHeaders } from '@angular/common/http';
import { CalculatorService } from '../calculator/calculator.service';


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
  providers:[JwtHelperService],
  templateUrl: './bono-history.component.html',
  styleUrls: ['./bono-history.component.css']
})
export class BonoHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'expand', 'name', 'currency', 'years',
    'couponRate', 'marketRate', 'tcea', 'duration',
    'startDate', 'actions'
  ];
  bonos: BondResource[] = [];
  expandedBono: number | null = null;
  userId!: number;

  constructor(
    private router: Router,
    private bonoService: BonoService,
    private jwtHelper: JwtHelperService,
    private calculatorService: CalculatorService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      console.log('[🎫 JWT DECODIFICADO]', decoded); // <--- Aquí

      this.userId =
        decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']
          ? parseInt(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'])
          : 0;      console.log('[🧍 userId en frontend]', this.userId);
      this.userId =
        decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']
          ? parseInt(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'])
          : 0;      console.log('UserID decodificado:', this.userId);

      if (this.userId) {
        this.bonoService.getHistorial(this.userId).subscribe({
          next: (bonos: BondResource[]) => {
            console.log('Bonos obtenidos:', bonos);
            this.bonos = bonos;
          },
          error: (err: any) => console.error('Error al obtener bonos:', err)
        });
      }
    } else {
      console.warn('No hay token en localStorage');
    }
  }


  toggleExpand(bonoId: number): void {
    this.expandedBono = this.expandedBono === bonoId ? null : bonoId;
  }

  eliminarBono(id: number): void {
    this.bonoService.eliminarBono(id).subscribe(() => {
      this.bonos = this.bonos.filter(b => b.id !== id);
      if (this.expandedBono === id) {
        this.expandedBono = null;
      }
    });
  }

  eliminarTodo(): void {
    this.bonoService.eliminarTodos(this.userId).subscribe(() => {
      this.bonos = [];
      this.expandedBono = null;
    });
  }

  editarBono(id: number): void {
    this.router.navigate(['/calculator', id]);
  }

  formatearFecha(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}
