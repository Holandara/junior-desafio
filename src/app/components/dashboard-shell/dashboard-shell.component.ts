import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'; 

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  template: `
    <div class="flex h-screen bg-background-100">

      <app-sidebar></app-sidebar>
 
      <div class="flex-1 overflow-y-auto p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class DashboardShellComponent {}
