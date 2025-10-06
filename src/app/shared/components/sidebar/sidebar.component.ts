import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface SidebarMenuItem {
  label: string;
  link?: string;
  icon?: string;
  children?: SidebarMenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() collapsed = false;

  @Input() menuItems: SidebarMenuItem[] = [];

  @Output() collapsedChange = new EventEmitter<boolean>();

  openSubmenus = new Set<string>();
  constructor(private router: Router) {} 

  get toggleIcon(): string {
    return this.collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  toggleSubmenu(item: SidebarMenuItem) {
    if (!item.children?.length) return;

    if (this.openSubmenus.has(item.label)) {
      this.openSubmenus.delete(item.label);
    } else {
      this.openSubmenus.add(item.label);
    }
  }

  onMenuClick(item: SidebarMenuItem) {
    // If it has children, toggle submenu only
    if (item.children?.length) {
      this.toggleSubmenu(item);
      return;
    }

    if (item.link) {
      this.router.navigate([item.link]);
    }
  }


  isSubmenuOpen(item: SidebarMenuItem): boolean {
    return this.openSubmenus.has(item.label);
  }
}
