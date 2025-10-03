import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginResponse } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';

  onSubmit() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res: LoginResponse) => {
        if (res.roles.includes('Admin')) {
          this.router.navigate(['/product']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => (this.error = 'Login failed. Please try again.')
    });
  }
}
