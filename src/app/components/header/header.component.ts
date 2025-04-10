import { Component, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="header bg-slate-100 px-4 py-3 shadow-md justify-between flex items-center">
      <span class="text-xl">My Store</span>
      <app-primary-button label="Cart" (btnClicked)="showButtonClicked()"/>
    </div>
  `,
})
export class HeaderComponent {


  showButtonClicked(){
    console.log('Button clicked');
  }
}
