import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent} from "./components/header/header.component";
import { PrimaryButtonComponent } from "./components/primary-button/primary-button.component";
import { ProductsListComponent } from "./pages/products-list/products-list.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, PrimaryButtonComponent, ProductsListComponent],
  template: `
  <app-header />


  <app-products-list />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-ecomm';
}
