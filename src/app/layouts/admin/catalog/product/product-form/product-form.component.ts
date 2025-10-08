import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../../core/services/product/product.service';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { CreateProductRequest, ProductDetail } from '../../../../../core/services/product/product.types';
import { BaseFormComponent } from '../../../../../shared/components/form/base-form.component';
import { BaseFormField } from '../../../../../shared/components/form/base-form.component.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [BaseFormComponent],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() product?: ProductDetail; // optional, if editing
  @Output() submitted = new EventEmitter<void>();

  fields: BaseFormField[] = [];
  model: CreateProductRequest = {
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 

    if (id) {
      // EDIT mode, fetch product by id
      this.productService.getProductById(+id).subscribe(product => {
        this.product = product;
        this.model = {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
        };
      });
    }

    // Load categories always
    this.categoryService.getCategories().subscribe((categories) => {
      this.fields = [
        { name: 'name', type: 'text', placeholder: 'Product Name', required: true, minLength: 3 },
        { name: 'description', type: 'textarea', placeholder: 'Description' },
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
    if (this.product) {
      // EDIT mode
      this.productService.updateProduct(this.product.id, formValue).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.submitted.emit();
        },
        error: (err) => console.error('Error updating product:', err),
      });
    } else {
      // ADD mode
      this.productService.addProduct(formValue).subscribe({
        next: () => {
          console.log('Product added successfully');
          this.submitted.emit();
        },
        error: (err) => console.error('Error adding product:', err),
      });
    }
  }
}
