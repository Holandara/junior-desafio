import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, ButtonModule, TableModule,
    DialogModule, ToastModule, TooltipModule, DatePickerModule,
    CardModule, HeaderComponent
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class RegisterComponent {
  title = 'desafio-junior';
  isNewUser: boolean = false;

  // Reactive Forms validators config
  profileForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      CustomValidators.namePattern
    ]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.passwordPattern
    ]),
    cpf: new FormControl(''),
    isFixed: new FormControl(false),
  });

  users: User[] = [];

  loggedDynamicUsersToday = 0;
  readonly MAX_DYNAMIC_LICENSES = 3;

  constructor(private messageService: MessageService) {
    this.loadUsers();
  }

  //gets current date based on simulateddate and saves on login
  getToday(): string {
    const simulated = localStorage.getItem('simulatedDate');
    const date = simulated ? new Date(simulated) : new Date();
    return date.toISOString().split('T')[0]; // Foormat: yyyy-mm-dd
  }

  //Loads users and count how many dynamics logged in current date
  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    const today = this.getToday();

    const dynamicUsersToday = loginHistory
      .filter((login: any) => login.date === today && login.isDynamic)
      .map((login: any) => login.userName);

    this.loggedDynamicUsersToday = new Set(dynamicUsersToday).size;
  }

  // Reactive forms Validators
  get email() {
    return this.profileForm.get('email');
  }

  get Name() {
    return this.profileForm.get('Name');
  }

  get password() {
    return this.profileForm.get('password');
  }

  // Count dynamic users
  get fixedUsersCount(): number {
    return this.users.filter(user => user.isFixed === false).length;
  }

  //Count fixed users
  get dinamicUsersCount(): number {
    return this.users.filter(user => user.isFixed === true).length;
  }

  //Creates new users and saves in local storage
  createUser() {
    const newUser = this.profileForm.value as User;

    const usersFromStorage = localStorage.getItem('users');
    const users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // resets form after submit
    this.profileForm.reset({
      Name: '',
      email: '',
      password: '',
      cpf: '',
      isFixed: false
    });

    this.visible = false; // Closes dialog register by default
    this.users = users; // Update table in real time
    this.profileForm.get('username')?.updateValueAndValidity(); // Update validators

  }

  visible: boolean = false; // Sets dialog invisible by default

  deleteUser(userToDelete: User) {
    const usersFromStorage = localStorage.getItem('users');
    let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users = users.filter((user: User) => user.Name !== userToDelete.Name);
    localStorage.setItem('users', JSON.stringify(users));
    this.users = users; //update list
    this.loadUsers;
  }

  showDialog() {
    this.visible = true;
    
  }
  // Success message after creating user

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Usuário criado',
      detail: 'Cadastro realizado com sucesso!'
    });
  }

  handleSubmit() {
    if (this.profileForm.valid) {
      this.showSuccess();
      this.createUser();
    }
  }

  // Verify if the dynamic user already logged in today
  hasUserLoggedToday(userName: string): boolean {
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    const today = this.getToday();

    return loginHistory.some(
      (login: any) =>
        login.userName === userName &&
        login.date === today &&
        login.isDynamic
    );
    this.loadUsers;
  }
}

interface User {
  Name: string;
  email: string;
  password: string;
  cpf: string;
  isFixed: boolean;
}
