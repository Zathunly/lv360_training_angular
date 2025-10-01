import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductService } from '../../../core/services/product/product.service';
import { ProductListItem } from '../../../core/services/product/product.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    ProductTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: ProductListItem[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']); 
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
