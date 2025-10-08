import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/auth/login/login.component';
import { RegisterComponent } from './layouts/auth/register/register.component';
import { MainLayoutComponent } from './layouts/admin/main-layout.component';
import { DashboardComponent } from './layouts/admin/dashboard/dashboard.component';
import { ProductTableComponent } from './layouts/admin/catalog/product/product-management/product-management.component';
import { ProductFormComponent } from './layouts/admin/catalog/product/product-form/product-form.component';
import { ProductComponent } from './layouts/admin/catalog/product/product.component';
import { StockComponent } from './layouts/admin/catalog/stock/stock.component';
import { StockManagementComponent } from './layouts/admin/catalog/stock/stock-management.html/stock-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'catalog',
        data: { breadcrumb: 'Catalog' },
        children: [
          {
            path: 'products',
            component: ProductComponent,
            data: { breadcrumb: 'Products' },
            children: [
              {
                path: '',
                component: ProductTableComponent,
                data: { breadcrumb: 'Products' },
              },
              {
                path: 'add',
                component: ProductFormComponent,
                data: { breadcrumb: 'Add Product' },
              },
              {
                path: 'edit/:id',
                component: ProductFormComponent,
                data: { breadcrumb: 'Edit Product' },
              },
            ],
          },
          {
            path: 'stocks',
            component: StockComponent,
            data: { breadcrumb: 'Stocks' },
            children: [
              {
                path: '',
                component: StockManagementComponent,
                data: { breadcrumb: 'Stock Management' },

              },
            ],
          },
        ],
      },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      //   data: { breadcrumb: 'Profile' },
      // },
    ],
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];
