import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { LicensesComponent } from "./components/licenses/licenses.component";
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardShellComponent,
    children: [
      { path: '', component: RegisterComponent },
      { path: 'licencas', component: LicensesComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];


