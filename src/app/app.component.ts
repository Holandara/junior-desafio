import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { HeaderComponent } from "./components/header/header.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <app-register/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-ecomm';
}
