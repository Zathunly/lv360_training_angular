import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/features/auth/login/login.component';
import { RegisterComponent } from './layouts/features/auth/register/register.component';
import { DashboardComponent } from './layouts/features/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AddProductFormComponent } from './layouts/features/dashboard/product-form/add-product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,  
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-product', component: AddProductFormComponent }, 
    ]
  },  { path: '**', redirectTo: 'login' },
];
