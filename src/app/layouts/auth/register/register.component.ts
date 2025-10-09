import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from '../../../shared/components/form/base-form.component';
import { BaseFormField } from '../../../shared/components/form/base-form.component.types';
import { AuthService, RegisterResponse } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';
  success = '';

  // Define form fields
  fields: BaseFormField[] = [
    { name: 'username', type: 'text', placeholder: 'Enter username', required: true, minLength: 3 },
    { name: 'email', type: 'text', placeholder: 'Enter email', required: true },
    { name: 'password', type: 'text', placeholder: 'Enter password', required: true, minLength: 6 },
    { name: 'confirmPassword', type: 'text', placeholder: 'Confirm password', required: true, minLength: 6 },
  ];

  model = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit(value: any) {
    if (value.password !== value.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.auth.register(value).subscribe({
      next: (res: RegisterResponse) => {
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
