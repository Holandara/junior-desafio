import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-3 gap-4">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product"/>
      }
    </div>
  `,
 
})
export class ProductsListComponent {
  products = signal<Product[]>([
    {
      id: 1,
      title: 'Product 1',
      image: 'https://via.placeholder.com/150',
      price: 100,
      stock: 10
    },
    {
      id: 2,
      title: 'Product 2',
      image: 'https://via.placeholder.com/150',
      price: 200,
      stock: 5
    },
    {
      id: 3,
      title: 'Product 3',
      image: 'https://via.placeholder.com/150',
      price: 300
    }
  ]);
}
