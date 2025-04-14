import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  title = 'desafio-junior';
  isNewUser: boolean = false;


//Usando reactive forms 
  profileForm = new FormGroup({
    Name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10), CustomValidators.namePattern]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,  Validators.minLength(3), CustomValidators.passwordPattern]),
    cpf: new FormControl(''),
    isFixed: new FormControl(false)


  });

  users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
  }
   
  //muda tela quando clica no botão 
  changeView() {
    this.isNewUser = !this.isNewUser;
  }

  //para validação dos formulários reativos
  get email() {
    return this.profileForm.get('email');
  }

  get Name() {
    return this.profileForm.get('Name');
  }
  get password() {
    return this.profileForm.get('password');
  }
  
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
  }

  deleteUser(userToDelete: User) {
    const usersFromStorage = localStorage.getItem('users');
    let users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
  
    users = users.filter((user: User) => user.Name !== userToDelete.Name);
  
    localStorage.setItem('users', JSON.stringify(users));
  
    // Atualiza lista exibida, se necessário
    this.users = users;
  }
  
  
}

interface User {
  Name: string;
  email: string;
  password: string;
  cpf: string;
  isFixed: boolean;
}
