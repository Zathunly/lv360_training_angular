import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from '../../../shared/components/form/base-form.component';
import { AuthService, LoginResponse } from '../../../core/auth/auth.service';
import { BaseFormField } from '../../../shared/components/form/base-form.component.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';

  fields: BaseFormField[] = [
    { name: 'username', type: 'text', placeholder: 'Enter your username', required: true, minLength: 3 },
    { name: 'password', type: 'text', placeholder: 'Enter your password', required: true },
  ];


  model = {
    username: '',
    password: ''
  };

  onSubmit(value: any) {
    this.auth.login(value).subscribe({
      next: (res: LoginResponse) => {
        if (res.roles.includes('Admin')) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => (this.error = 'Login failed. Please try again.')
    });
  }
}
