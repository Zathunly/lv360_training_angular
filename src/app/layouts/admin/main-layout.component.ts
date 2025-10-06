import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarMenuItem } from '../../shared/components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BreadcrumbComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  sidebarCollapsed = false;

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
}
