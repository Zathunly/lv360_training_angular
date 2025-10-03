import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/features/auth/login/login.component';
import { RegisterComponent } from './layouts/features/auth/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { DashboardComponent } from './layouts/features/dashboard/dashboard.component';
import { ProductTableComponent } from './layouts/features/dashboard/product-table/product-table.component';
import { AddProductFormComponent } from './layouts/features/dashboard/product-form/add-product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'product',
        component: DashboardComponent, 
        data: { breadcrumb: 'Product' },
        children: [
          {
            path: '',
            component: ProductTableComponent,
          },
          {
            path: 'add',
            component: AddProductFormComponent,
            data: { breadcrumb: 'Add Product' }
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
