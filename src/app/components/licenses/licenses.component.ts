import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseService } from '../../services/license.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-licenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    SliderModule,
    CardModule,
    ButtonModule,
    DropdownModule, 
    RouterModule
  ],
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {
  
  manualLicenses: any[] = JSON.parse(localStorage.getItem('manualLicenses') || '[]');

  visibleConfig = false;
  users: any[] = [];
  licenses: any[] = [];
  showNewLicenseForm = false;
  newLicense = {
    licenseName: '',
    licenseType: '',
    licenseDescription: '' 
  };
  constructor(private licenseService: LicenseService) {}

  toggleNewLicenseCard() {
    this.showNewLicenseForm = true;
  }

  createLicense() {
    if (!this.newLicense.licenseName || !this.newLicense.licenseType || !this.newLicense.licenseDescription) return;
  
    // Adiciona a nova licença à lista
    this.manualLicenses.push({ ...this.newLicense });
    localStorage.setItem('manualLicenses', JSON.stringify(this.manualLicenses));
  
    // Limpa o formulário
    this.newLicense = { licenseName: '', licenseType: '', licenseDescription: '' };
    this.showNewLicenseForm = false;  // Fecha o formulário
  }

  ngOnInit() {
    this.loadUsers();
    this.loadLicenses();
    const stored = localStorage.getItem('manualLicenses');
    this.manualLicenses = stored ? JSON.parse(stored) : [];
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
  }

  loadLicenses() {
    const licensesFromStorage = localStorage.getItem('licenses');
    this.licenses = licensesFromStorage ? JSON.parse(licensesFromStorage) : [];
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