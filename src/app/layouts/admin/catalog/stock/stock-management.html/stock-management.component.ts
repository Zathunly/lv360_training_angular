import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EditableTableComponent } from '../../../../../shared/components/table/editable-table/editable-table.component';
import { BaseModalComponent } from '../../../../../shared/components/modal/base-modal.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { EditableTableColumn } from '../../../../../shared/components/table/editable-table/editable-table.component.types';

import { StockDetail } from '../../../../../core/services/stock/stock.types';
import { StockActions } from '../../../../../core/store/stock/stock.actions';
import { ProductActions } from '../../../../../core/store/product/product.actions';
import { WarehouseActions } from '../../../../../core/store/warehouse/warehouse.actions';
import { selectAllStocks, selectStockLoading } from '../../../../../core/store/stock/stock.selectors';
import { selectAllProducts } from '../../../../../core/store/product/product.selectors';
import { selectAllWarehouses } from '../../../../../core/store/warehouse/warehouse.selectors';

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [CommonModule, FormsModule, EditableTableComponent, ButtonComponent, BaseModalComponent],
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss'],
})
export class StockManagementComponent implements OnInit {
  stocks$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  columns: EditableTableColumn[] = [];
  massEditMode = false;
  selectedStockId: number | null = null;

  @ViewChild('deleteModal') deleteModal!: BaseModalComponent;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Dispatch loads
    this.store.dispatch(ProductActions.loadProducts());
    this.store.dispatch(WarehouseActions.loadWarehouses());
    this.store.dispatch(StockActions.loadStocks());

    const products$ = this.store.select(selectAllProducts);
    const warehouses$ = this.store.select(selectAllWarehouses);
    const stocks$ = this.store.select(selectAllStocks);
    this.loading$ = this.store.select(selectStockLoading);

    this.stocks$ = combineLatest([stocks$, products$, warehouses$]).pipe(
      map(([stocks, products, warehouses]) =>
        stocks.map(stock => {
          const matchedProduct = products.find(p => p.id === stock.product?.id);
          const matchedWarehouse = warehouses.find(w => w.id === stock.warehouse?.id);

          return {
            ...stock,
            productId: matchedProduct?.id ?? null,
            warehouseId: matchedWarehouse?.id ?? null,
            productName: matchedProduct?.name ?? null,
            warehouseName: matchedWarehouse?.name ?? null,
          };
        })
      )
    );

    this.columns = [
      { field: 'id', header: 'ID', type: 'number', editable: false },
      {
        field: 'productId',
        header: 'Product',
        type: 'select',
        editable: true,
        options: [],
      },
      {
        field: 'warehouseId',
        header: 'Warehouse',
        type: 'select',
        editable: true,
        options: [],
      },
      { field: 'quantity', header: 'Quantity', type: 'number', editable: true },
      { field: 'lastUpdatedAt', header: 'Last Updated', type: 'text', editable: false },
      { field: 'actions', header: 'Actions', type: 'actions' },
    ];

    // Attach options once products and warehouses are loaded
    combineLatest([products$, warehouses$]).subscribe(([products, warehouses]) => {
      const productColumn = this.columns.find(c => c.field === 'productId');
      if (productColumn) productColumn.options = products.map(p => ({ id: p.id, name: p.name }));

      const warehouseColumn = this.columns.find(c => c.field === 'warehouseId');
      if (warehouseColumn) warehouseColumn.options = warehouses.map(w => ({ id: w.id, name: w.name }));
    });
  }

  toggleMassEdit() {
    this.massEditMode = !this.massEditMode;
  }

  saveAllChanges(stocks: StockDetail[]) {
    stocks.forEach(stock => {
      this.store.dispatch(
        StockActions.updateStock({
          id: stock.id,
          request: { quantity: stock.quantity },
        })
      );
    });
    this.massEditMode = false;
  }

  openEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  openDeleteModal(id: number) {
    this.selectedStockId = id;
    this.deleteModal.open();
  }

  confirmDelete() {
    if (!this.selectedStockId) return;
    this.store.dispatch(StockActions.deleteStock({ id: this.selectedStockId }));
    this.deleteModal.close();
  }

  goToAddStock() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onModalClosed() {
    this.selectedStockId = null;
  }
}
