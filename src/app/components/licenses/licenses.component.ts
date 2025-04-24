import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseService } from '../../services/license.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-licenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    SliderModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {
  visibleConfig = false;
  users: any[] = [];

  constructor(private licenseService: LicenseService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
  }

  get MAX_DYNAMIC_LICENSES(): number {
    return this.licenseService.MAX_DYNAMIC_LICENSES;
  }

  set MAX_DYNAMIC_LICENSES(value: number) {
    this.licenseService.MAX_DYNAMIC_LICENSES = value;
  }

  get fixedUsersCount(): number {
    return this.users.filter(user => user.license === 'fixo').length;
  }

  get dinamicUsersCount(): number {
    return this.users.filter(user => user.license === 'dinâmico').length;
  }

  showConfig() {
    this.visibleConfig = true;
  }
}