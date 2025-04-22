import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  imports: [TooltipModule, RouterModule],
  standalone: true,
  template: `
  <div class="header bg-white line w-screen md:w-full  px-4 py-3 shadow-md justify-between flex items-center">
      <span  class="px-5 text-xl  font-bold bg-gradient-to-r from-blue to-green inline-block text-transparent bg-clip-text">Gestão de usuários</span>
      <span class="px-5 text-xl  font-bold bg-gradient-to-r text-blue hover:cursos-pointer">
      <i  class="pi pi-user pr-7" ></i>
      <i  class="pi pi-sign-out" routerLink="/login" ></i>
      
      </span>
  </div>
  <div class="h-1 w-1"></div>
  `,
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
