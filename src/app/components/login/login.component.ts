import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-login',
  imports: [RouterModule, DividerModule, ButtonModule, InputTextModule, CardModule, DatePickerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class LoginComponent {
  constructor(private router: Router) {}

login() {
  // Verificação de credenciais, etc.
  this.router.navigate(['/registro']);
}

 }
