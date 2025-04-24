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
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule, DividerModule, ButtonModule, InputTextModule, CardModule, 
    ReactiveFormsModule, DatePickerModule, InputIconModule, IconFieldModule, 
    CommonModule, MessageModule, ToastModule, DialogModule
  ],
  templateUrl: './login.component.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService] 
})
export class LoginComponent {

  loginForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    loginDate: new FormControl(new Date(), [Validators.required]),
  });

  users: User[] = [];
  loginError = false;

  constructor(
    private router: Router,
    private licenseService: LicenseService, 
    private messageService: MessageService 
  ) {
    this.initializeAdminUser();
    this.loadUsers();
  }

  
  visible: boolean = false; // Sets dialog invisible by default

  private initializeAdminUser() {
    const usersFromStorage = localStorage.getItem('users');
    let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
    
    const adminExists = users.some((user: User) => user.Name === 'admin');
    
    if (!adminExists) {
      const adminUser: User = {
        Name: 'admin',
        email: 'admin@system.com',
        password: 'Admin@123',
        cpf: '000.000.000-00',
        license: 'admin'
      };
      
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers();
    }
  }

  showDialog() {
    this.visible = true;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.Name;
      const password = this.loginForm.value.password;
      const selectedDate = this.loginForm.value.loginDate;
  
      if (name === 'admin' && password === 'Admin@123') {
        this.router.navigate(['/dashboard']);
        return;
      }
  
      const user = this.users.find(u => u.Name === name && u.password === password);
  
      if (user) {
        if (selectedDate) {
          localStorage.setItem('simulatedDate', new Date(selectedDate).toISOString().split('T')[0]);
        }
  
        // Verifica se o usuário pode logar
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
    const selectedDate = this.loginForm.value.loginDate;
    if (selectedDate) {
      localStorage.setItem('simulatedDate', new Date(selectedDate).toISOString().split('T')[0]);

      this.loadDate();
    }

    this.router.navigate(['/dashboard']);

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

  loadDate() {
    const date = localStorage.getItem('simulatedDate');
    if (date) {
      console.log('Data simulada carregada:', date);
    }
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
  date?: string;
  license: 'fixo' | 'dinâmico' | 'admin';
  email?: string;
  cpf?: string;
}