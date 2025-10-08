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
}
