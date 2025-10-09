import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarMenuItem } from '../../shared/components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BaseHeaderLink } from '../../shared/components/header/base-header.component.types';
import { BaseHeaderComponent } from '../../shared/components/header/base-header.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BreadcrumbComponent, BaseHeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  sidebarCollapsed = false;

  headerLinks: BaseHeaderLink[] = [
    { label: 'Home', path: '/home', icon: 'fa fa-home' },
    { label: 'Profile', path: '/profile', icon: 'fa fa-user' },
    { label: 'Logout', click: this.onLogout.bind(this), icon: 'fa fa-sign-out' }
  ];

  menuItems: SidebarMenuItem[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      label: 'Catalog',
      icon: 'fas fa-boxes',
      children: [
        { label: 'Products', link: '/catalog/products', icon: 'fas fa-box' },
        { label: 'Stocks', link: '/catalog/stocks', icon: 'fas fa-warehouse' },

      ],
    },
    {
      label: 'Profile',
      link: '/profile',
      icon: 'fas fa-user',
    },
  ];

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  onHeaderLinkClicked(link: BaseHeaderLink) {
    console.log('Header link clicked:', link.label);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}

