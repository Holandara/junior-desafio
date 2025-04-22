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

  // Usando reactive forms para validação de campo
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

  //Ideia de UI 
  loggedDynamicUsersToday = 0;
  readonly MAX_DYNAMIC_LICENSES = 3;

  constructor(private messageService: MessageService) {
    this.loadUsers();
  }

  // Obtém a data "atual" baseada na data simulada salva no login
  getToday(): string {
    const simulated = localStorage.getItem('simulatedDate');
    const date = simulated ? new Date(simulated) : new Date();
    return date.toISOString().split('T')[0]; // formato: yyyy-mm-dd
  }

  // Carrega usuários e calcula quantos dinâmicos logaram na data atual
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

  // Muda tela quando clica no botão - temporário
  changeView() {
    this.isNewUser = !this.isNewUser;
  }

  // Para validação dos formulários reativos
  get email() {
    return this.profileForm.get('email');
  }

  get Name() {
    return this.profileForm.get('Name');
  }

  get password() {
    return this.profileForm.get('password');
  }

  // Conta usuários dinâmicos
  get fixedUsersCount(): number {
    return this.users.filter(user => user.isFixed === false).length;
  }

  // Conta usuários fixos
  get dinamicUsersCount(): number {
    return this.users.filter(user => user.isFixed === true).length;
  }

  // Cria novo usuário e salva no localStorage
  createUser() {
    const newUser = this.profileForm.value as User;

    const usersFromStorage = localStorage.getItem('users');
    const users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Resetar o formulário após salvar
    this.profileForm.reset({
      Name: '',
      email: '',
      password: '',
      cpf: '',
      isFixed: false
    });

    this.visible = false; // Fecha dialog de registro
    this.users = users; // Atualiza tabela em tempo real
    this.profileForm.get('username')?.updateValueAndValidity(); // Atualiza validators

  }

  visible: boolean = false; // Determina o dialog de registro como invisível assim que entra na página

  deleteUser(userToDelete: User) {
    const usersFromStorage = localStorage.getItem('users');
    let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users = users.filter((user: User) => user.Name !== userToDelete.Name);
    localStorage.setItem('users', JSON.stringify(users));
    this.users = users; // Atualiza lista exibida
  }

  // Mensagem de sucesso após criar usuário
  showDialog() {
    this.visible = true;
  }

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

  // Verifica se o usuário dinâmico já logou hoje
  hasUserLoggedToday(userName: string): boolean {
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    const today = this.getToday();

    return loginHistory.some(
      (login: any) =>
        login.userName === userName &&
        login.date === today &&
        login.isDynamic
    );
  }
}

interface User {
  Name: string;
  email: string;
  password: string;
  cpf: string;
  isFixed: boolean;
}
