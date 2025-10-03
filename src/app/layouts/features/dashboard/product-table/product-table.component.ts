import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProductService } from '../../../../core/services/product/product.service';
import { ProductListItem } from '../../../../core/services/product/product.types';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  products: ProductListItem[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  onEdit(product: ProductListItem) {
    console.log('Edit product:', product);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== id);
      },
      error: (err) => console.error('Error deleting product:', err),
    });
  }
}
