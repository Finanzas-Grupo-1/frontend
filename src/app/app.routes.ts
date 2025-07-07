import { Routes } from '@angular/router';
import { LoginComponent } from './IAM/auth/login/login.component';
import {RegisterComponent} from './IAM/auth/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuard} from './IAM/auth/auth.guard';
import {CalculatorComponent} from './features/calculator/calculator.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
  {
    path: 'configuracion',
    loadComponent: () => import('./configuration/configuration.component').then(m => m.ConfigurationComponent)
  },
  {
    path: 'bonohistorial',
    loadComponent: () => import('./features/bono-history/bono-history.component').then(m => m.BonoHistoryComponent)
  },
  {
    path: 'calculator/:id',
    loadComponent: () =>
      import('./features/calculator/calculator.component').then(m => m.CalculatorComponent)
  }
];
