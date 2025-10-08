import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../base-table/base-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableTableColumn } from './editable-table.component.types';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent<T extends Record<string, any> = any> extends BaseTableComponent<T> {
    @Input() massEditMode = false;
    @Input() override columns: EditableTableColumn[] = [];

    @Output() edit = new EventEmitter<number>(); 
    @Output() delete = new EventEmitter<number>();
    @Output() saveAll = new EventEmitter<T[]>();

    getOptionName(column: EditableTableColumn, value: any) {
        return column.options?.find((o: { id: string | number; name: string }) => o.id === value)?.name || '';
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
