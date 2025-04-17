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
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-login',
  imports: [RouterModule, DividerModule, ButtonModule, InputTextModule, CardModule, ReactiveFormsModule,
            DatePickerModule, InputIconModule, IconFieldModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class LoginComponent {
  loginForm = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  users: User[] = [];
  constructor(private router: Router) {
    this.loadUsers();
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

loginError = false;
login() {
  const name = this.Name?.value;
  const password = this.password?.value;

  const user = this.users.find(u => u.Name === name && u.password === password);
 

  if (user) {
    this.loginError = false; // limpa erro se tiver
    this.router.navigate(['/registro']);
  } else {
    this.loginError = true; // mostra erro se falhou
  }
}


 }
 interface User {
  Name:string;
  password: string;
}