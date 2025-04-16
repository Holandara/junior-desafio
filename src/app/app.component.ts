import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router"


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  
})
export class AppComponent {
  title = 'angular-ecomm';
}
