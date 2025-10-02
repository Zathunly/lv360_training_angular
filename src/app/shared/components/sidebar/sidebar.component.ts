import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  collapsed = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  // Define icons fully in TS
  menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'Profile', link: '/profile', icon: 'fas fa-user' },
    { label: 'Settings', link: '/settings', icon: 'fas fa-cog' },
  ];

  // Toggle button icon fully in TS
  get toggleIcon(): string {
    return this.collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed); 
  }
}
