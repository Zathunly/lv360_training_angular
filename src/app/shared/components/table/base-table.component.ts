import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

export interface BaseColumn {
  field: string;
  header: string;
  type?: 'text' | 'number' | 'select' | 'actions';
  options?: { id: string | number; name: string }[];
  editable?: boolean; 
}

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent {
  @Input() columns: BaseColumn[] = [];
  @Input() data: any[] = [];
  @Input() massEditMode = false;

  @Output() saveAll = new EventEmitter<any[]>();
  @Output() delete = new EventEmitter<number>();

  trackById(index: number, item: any) {
    return item.id;
  }

  getOptionName(col: BaseColumn, row: any): string {
    if (!col.options) return '—';
    const option = col.options.find(o => o && o.id === row[col.field]);
    return option ? option.name : '—';
  }
}
