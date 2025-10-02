import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseModalComponent } from '../../../../shared/components/modal/base-modal.component';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BaseModalComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  @ViewChild('deleteModal') deleteModal!: BaseModalComponent;

  // Make nullable to avoid TS error
  private deletingProductId: number | null = null;

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  // Open modal and store product id
  openDeleteModal(id: number) {
    this.deletingProductId = id;
    this.deleteModal.open();
  }

  // Confirm delete from modal
  confirmDelete() {
    if (this.deletingProductId !== null) {
      this.delete.emit(this.deletingProductId);
      this.deleteModal.close();
      this.deletingProductId = null;
    }
  }

  // Reset product id when modal closes without deletion
  onModalClosed() {
    this.deletingProductId = null;
  }
}
