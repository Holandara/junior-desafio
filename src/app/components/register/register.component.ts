import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from "../header/header.component";
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { LicenseService } from '../../services/license.service';
import { DropdownModule } from 'primeng/dropdown';

import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, ButtonModule, TableModule,
    DialogModule, ToastModule, TooltipModule, DatePickerModule,
    CardModule, HeaderComponent, Slider, FormsModule, DropdownModule, RouterOutlet
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class RegisterComponent {
  title = 'desafio-junior';
  isNewUser: boolean = false;
  selectedUser: User | null = null;

  // Opções de licença
  licenseOptions: { label: string, value: string }[] = [
    { label: 'Usuário fixo', value: 'fixo' },
    { label: 'Usuário dinâmico', value: 'dinâmico' }
  ];

  selectedLicense: string = 'dinâmico'; // Valor padrão

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
    license: new FormControl<'fixo' | 'dinâmico'>('dinâmico')
  });

  editForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.email]),
    cpf: new FormControl(''),
    license: new FormControl<'fixo' | 'dinâmico'>('dinâmico')
  });

  loggedDynamicUsersToday: number = 0;
  users: User[] = [];
  sidebarOpen = true;

  constructor(
    private messageService: MessageService,
    private licenseService: LicenseService
  ) {
    this.loadUsers();
    this.loadLicenseFromStorage();
  }

  // Carregar a licença do localStorage se existir
  loadLicenseFromStorage() {
    const savedLicense = localStorage.getItem('license');
    if (savedLicense) {
      this.selectedLicense = savedLicense;
    }
  }

  // Atualizar o valor da licença no localStorage
  updateLicenseSelection() {
    localStorage.setItem('license', this.selectedLicense);
  }

  get MAX_DYNAMIC_LICENSES(): number {
    return this.licenseService.MAX_DYNAMIC_LICENSES;
  }

  set MAX_DYNAMIC_LICENSES(value: number) {
    this.licenseService.MAX_DYNAMIC_LICENSES = value;
  }

  getToday(): string {
    const simulated = localStorage.getItem('simulatedDate');
    const date = simulated ? new Date(simulated) : new Date();
    return date.toISOString().split('T')[0];
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    const today = this.getToday();

    const dynamicUsersToday = loginHistory
      .filter((login: any) => login.date === today && login.license === 'dinâmico')
      .map((login: any) => login.userName);

    this.loggedDynamicUsersToday = new Set(dynamicUsersToday).size;
  }

  get email() {
    return this.profileForm.get('email');
  }

  get Name() {
    return this.profileForm.get('Name');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get fixedUsersCount(): number {
    return this.users.filter(user => user.license === 'fixo').length;
  }

  get dinamicUsersCount(): number {
    return this.users.filter(user => user.license === 'dinâmico').length;
  }

  createUser() {
    const newUser = this.profileForm.value as User;

    const usersFromStorage = localStorage.getItem('users');
    const users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.profileForm.reset({
      Name: '',
      email: '',
      password: '',
      cpf: '',
      license: 'dinâmico'
    });

    this.visible = false;
    this.users = users;
    this.profileForm.get('username')?.updateValueAndValidity();
  }

  visible: boolean = false;
  visibleEdit: boolean = false;
  visibleConfig: boolean = false;

  deleteUser(userToDelete: User) {
    const usersFromStorage = localStorage.getItem('users');
    let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    users = users.filter((user: User) => user.Name !== userToDelete.Name);
    localStorage.setItem('users', JSON.stringify(users));
    this.users = users;
    this.loadUsers();
  }

  editUser(userToEdit: User) {
    console.log('Usuário selecionado para edição:', userToEdit)
    this.selectedUser = userToEdit;
    this.editForm.patchValue({
      Name: userToEdit.Name,
      email: userToEdit.email,
      cpf: userToEdit.cpf,
      license: userToEdit.license
    });
    this.visibleEdit = true;
  }

  handleEditSubmit() {
    if (this.editForm.valid && this.selectedUser) {
      const updatedUser = {
        ...this.selectedUser,
        ...this.editForm.value,
      };

      const usersFromStorage = localStorage.getItem('users');
      let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

      users = users.map((user: User) =>
        user.Name === this.selectedUser?.Name ? updatedUser : user
      );

      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers();
      this.visibleEdit = false;
      this.editForm.reset();
      this.selectedUser = null;
    }
  }

  showDialog2(){
    this.visibleEdit = true;
  }

  showDialog() {
    this.visible = true;
  }

  showConfig(){
    this.visibleConfig = true;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Usuário criado',
      detail: 'Cadastro realizado com sucesso!'
    });
    
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  handleSubmit() {
    if (this.profileForm.valid) {
      this.showSuccess();
      this.createUser();
    }
  }

  hasUserLoggedToday(userName: string): boolean {
  const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
  const today = this.getToday();

  return loginHistory.some(
    (login: any) =>
      login.userName === userName &&
      login.date === today &&
      login.license === 'dinâmico'
  );
}

 

}


interface User {
  Name: string;
  email: string;
  password: string;
  cpf: string;
  license: 'fixo' | 'dinâmico';
}
