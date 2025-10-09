import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../base-table/base-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableTableColumn } from './editable-table.component.types';
import { ButtonComponent } from '../../button/button.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent<T extends Record<string, any> = any> extends BaseTableComponent<T> {
  @Input() massEditMode = false;
  @Input() override columns: EditableTableColumn[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() saveAll = new EventEmitter<T[]>();

  getOptionName(col: EditableTableColumn, value: number): string {
    const opt = col.options?.find((o: any) => o.id === value);
    return opt ? opt.name : '';
  }

  deleteRow(index: number) {
    const row = this.data[index];
    if (row && row['id'] !== undefined) {
      this.delete.emit(row['id']);
    }
  }

  editRow(index: number) {
    const row = this.data[index];
    if (row && row['id'] !== undefined) {
      this.edit.emit(row['id']);
    }
  }

  saveAllChanges() {
    this.saveAll.emit(this.data);
  }
}
