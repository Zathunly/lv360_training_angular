import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { CategoryService } from '../../../../core/services/category/category.service';
import { CreateProductRequest } from '../../../../core/services/product/product.types';
import { BaseFormComponent, BaseFormField } from '../../../../shared/components/form/base-form.component';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [BaseFormComponent], 
  template: `
    <h2>Add Product</h2>
    <app-base-form
      [fields]="fields"
      [model]="model"
      (submitted)="onSubmit($event)">
    </app-base-form>
  `,
})
export class AddProductFormComponent implements OnInit {
  fields: BaseFormField[] = [];
  model: CreateProductRequest = {
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
  };

  @Output() submitted = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.fields = [
        { name: 'name', type: 'text', placeholder: 'Product Name', required: true },
        { name: 'description', type: 'text', placeholder: 'Description', required: true },
        { name: 'price', type: 'number', placeholder: 'Price', required: true },
        {
          name: 'categoryId',
          type: 'select',
          required: true,
          options: categories.map((c) => ({ value: c.id, label: c.name }))
        }
      ];
    });
  }

  onSubmit(formValue: CreateProductRequest) {
    this.productService.addProduct(formValue).subscribe({
      next: () => {
        console.log('Product added');
        this.submitted.emit();
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }
}
