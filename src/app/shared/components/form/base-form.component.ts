import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface BaseFormField {
  name: string;
  type: string; // "text" | "number" | "select" ...
  placeholder?: string;
  required?: boolean;
  options?: { value: any; label: string }[]; 
}


@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent {
  @Input() fields: BaseFormField[] = [];
  @Input() model: any = {};
  @Output() submitted = new EventEmitter<any>();

  onSubmit() {
    this.submitted.emit(this.model);
  }
}
