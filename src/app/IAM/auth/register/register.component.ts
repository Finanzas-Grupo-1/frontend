import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('Se hizo clic en Registrar');
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(res => {
      if (res.success) {
        this.successMessage = 'Cuenta registrada correctamente. Redirigiendo...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigateByUrl('/login'), 2000);
      } else {
        this.errorMessage = 'Error al registrar usuario.';
        this.successMessage = '';
      }
    });
  }
}
