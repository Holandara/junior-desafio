import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [RouterModule],
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
