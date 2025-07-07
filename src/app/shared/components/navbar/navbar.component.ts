import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../../IAM/auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    alert('Sesión cerrada con éxito');
    this.router.navigateByUrl('/login');
  }

  logClick(origen: string): void {
    console.log(`[NAVBAR] Click en: ${origen}`);
  }

}
