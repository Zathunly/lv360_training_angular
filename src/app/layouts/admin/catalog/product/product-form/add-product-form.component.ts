import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../../core/services/product/product.service';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { CreateProductRequest } from '../../../../../core/services/product/product.types';
import { BaseFormComponent } from '../../../../../shared/components/form/base-form.component';
import { BaseFormField } from '../../../../../shared/components/form/base-form.component.types';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [BaseFormComponent],
  templateUrl: './add-product-form.component.html',
  // styleUrls: ['./add-product-form.component.scss'],
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
        { name: 'name', type: 'text', placeholder: 'Product Name', required: true, minLength: 3 },
        { name: 'description', type: 'textarea', placeholder: 'Description'},
        { name: 'price', type: 'number', placeholder: 'Price', required: true, min: 1 },
        {
          name: 'categoryId',
          type: 'select',
          placeholder: 'Category',
          required: true,
          options: categories.map((c) => ({ value: c.id, label: c.name })),
        },
      ];
    });
  }

  onSubmit(formValue: CreateProductRequest) {
    this.productService.addProduct(formValue).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.submitted.emit();
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }
}
