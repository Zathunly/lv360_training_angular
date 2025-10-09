import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { EditableTableComponent } from '../../../../../shared/components/table/editable-table/editable-table.component';
import { BaseModalComponent } from '../../../../../shared/components/modal/base-modal.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { EditableTableColumn } from '../../../../../shared/components/table/editable-table/editable-table.component.types';

import { ProductListItem } from '../../../../../core/services/product/product.types';
import { ProductActions } from '../../../../../core/store/product/product.actions';
import { CategoryActions } from '../../../../../core/store/category/category.actions';
import {
  selectAllProducts,
  selectProductLoading,
} from '../../../../../core/store/product/product.selectors';
import {
  selectAllCategories,
  selectCategoryLoading,
} from '../../../../../core/store/category/category.selectors';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditableTableComponent,
    ButtonComponent,
    BaseModalComponent,
  ],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductTableComponent implements OnInit, OnDestroy {
  products$!: Observable<ProductListItem[]>;
  products: ProductListItem[] = []; 
  categories$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  private productsSub?: Subscription;

  columns: EditableTableColumn[] = [];
  massEditMode = false;
  selectedProductId: number | null = null;

  @ViewChild('deleteModal') deleteModal!: BaseModalComponent;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts);
    this.categories$ = this.store.select(selectAllCategories);
    this.loading$ = combineLatest([
      this.store.select(selectProductLoading),
      this.store.select(selectCategoryLoading),
    ]).pipe(map(([p, c]) => p || c));

    this.store.dispatch(ProductActions.loadProducts());
    this.store.dispatch(CategoryActions.loadCategories());

    this.productsSub = this.products$.subscribe((p) => {
      this.products = p.map((item) => ({ ...item }));
    });

    this.categories$.subscribe((categories) => {
      this.columns = [
        { field: 'id', header: 'ID', type: 'number', editable: false },
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'price', header: 'Price', type: 'number' },
        {
          field: 'categoryId',
          header: 'Category',
          type: 'select',
          options: categories.map((c) => ({ id: c.id, name: c.name })),
        },
        { field: 'actions', header: 'Actions', type: 'actions' },
      ];
    });
  }

  toggleMassEdit() {
    this.massEditMode = !this.massEditMode;

    if (!this.massEditMode) {
      this.store
        .select(selectAllProducts)
        .pipe(map((p) => p.map((item) => ({ ...item }))))
        .subscribe((cloned) => (this.products = cloned))
        .unsubscribe();
    }
  }

  saveAllChanges(products: ProductListItem[]) {
    products.forEach(p => console.log(`Saving product ${p.id} with categoryId:`, p.categoryId));

    const updates = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      categoryId: p.categoryId,
    }));

    this.store.dispatch(ProductActions.updateProductsBulk({ products: updates }));
    this.massEditMode = false;
  }


  openDeleteModal(id: number) {
    this.selectedProductId = id;
    this.deleteModal.open();
  }

  openEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  goToAddProduct() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  confirmDelete() {
    if (!this.selectedProductId) return;
    this.store.dispatch(
      ProductActions.deleteProduct({ id: this.selectedProductId })
    );
    this.deleteModal.close();
  }

  onModalClosed() {
    this.selectedProductId = null;
  }

  ngOnDestroy() {
    this.productsSub?.unsubscribe();
  }
}
