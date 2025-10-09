// base-table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseColumn } from './base-table.component.types';

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<T extends Record<string, any> = any> {
  @Input() columns: BaseColumn[] = [];
  @Input() data: T[] = [];

  trackById(index: number, item: T): any {
    return item['id'] ?? index;
  }

  formatValue(col: BaseColumn, value: any): any {
    if (col.type === 'datetime' && value) {
      const iso = value.includes('.') ? value.replace(/\.(\d{3})\d*/, '.$1') : value;
      const date = new Date(iso);
      if (isNaN(date.getTime())) return value;

      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return value;
  }
}
