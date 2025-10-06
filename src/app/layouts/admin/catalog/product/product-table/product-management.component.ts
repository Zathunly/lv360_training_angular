import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../../../core/services/product/product.service';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { ProductListItem } from '../../../../../core/services/product/product.types';
import { Category } from '../../../../../core/services/category/category.types';
import { BaseTableComponent, BaseColumn } from '../../../../../shared/components/table/base-table.component';
import { BaseModalComponent } from '../../../../../shared/components/modal/base-modal.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseTableComponent, ButtonComponent, BaseModalComponent],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: ProductListItem[] = [];
  categories: Category[] = [];
  massEditMode = false;
  columns: BaseColumn[] = [];

  @ViewChild('deleteModal') deleteModal!: BaseModalComponent;
  selectedProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories(),
    }).subscribe(({ products, categories }) => {
      this.products = products;
      this.categories = categories;

      this.columns = [
        { field: 'id', header: 'ID', type: 'number', editable: false },
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'price', header: 'Price', type: 'number' },
        { field: 'categoryId', header: 'Category', type: 'select', options: categories.map(c => ({ id: c.id, name: c.name })) },
        { field: 'actions', header: 'Actions', type: 'actions' },
      ];
    });
  }

  toggleMassEdit() {
    this.massEditMode = !this.massEditMode;
  }

  saveAllChanges() {
    const requests = this.products.map(p =>
      this.productService.updateProduct(p.id, {
        name: p.name,
        price: p.price,
        categoryId: p.categoryId,
      })
    );

    forkJoin(requests).subscribe(() => {
      this.massEditMode = false;
      this.loadData();
    });
  }

  openDeleteModal(id: number) {
    this.selectedProductId = id;
    this.deleteModal.open();
  }

  confirmDelete() {
    if (!this.selectedProductId) return;
    this.productService.deleteProduct(this.selectedProductId).subscribe(() => {
      this.products = this.products.filter(p => p.id !== this.selectedProductId);
      this.deleteModal.close();
    });
  }

  onModalClosed() {
    this.selectedProductId = null;
  }

  goToAddProduct() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
