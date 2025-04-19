import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';
import { HeaderComponent } from "../header/header.component";
import { MessageModule } from 'primeng/message';
import { LicenseService } from '../../services/license.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule, DividerModule, ButtonModule, InputTextModule, CardModule, 
    ReactiveFormsModule, DatePickerModule, InputIconModule, IconFieldModule, 
    CommonModule, MessageModule, ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService] 
})
export class LoginComponent {

  loginForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  users: User[] = [];
  loginError = false;

  constructor(
    private router: Router,
    private licenseService: LicenseService, 
    private messageService: MessageService 
  ) {
    this.loadUsers();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.Name;
      const password = this.loginForm.value.password;
      const user = this.users.find(u => u.Name === name && u.password === password);
  
      if (user) {
        const loginCheck = this.licenseService.canUserLogin(user);
        
        if (loginCheck.allowed) {
          this.licenseService.registerLogin(user);
          this.handleSuccessfulLogin(user);
        } else {
          this.showLoginError(loginCheck.reason || 'Login não permitido');
        }
      } else {
        this.showLoginError('Credenciais inválidas');
      }
    }
  }
  
  private handleSuccessfulLogin(user: User) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['/registro']);
  }
  
  private showLoginError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro no login',
      detail: message,
      life: 5000
    });
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
  }

  get Name() {
    return this.loginForm.get('Name');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

interface User {
  Name: string;
  password: string;
  date: string;
  isFixed: boolean; 
}