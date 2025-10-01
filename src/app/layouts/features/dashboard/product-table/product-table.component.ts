// product-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
