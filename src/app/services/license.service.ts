import { Injectable } from '@angular/core';
import { CurrentDateService } from './current-date.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private _MAX_DYNAMIC_LICENSES = 0;
  private readonly LOGIN_HISTORY_KEY = 'loginHistory';
 

  get MAX_DYNAMIC_LICENSES(): number {
    return this._MAX_DYNAMIC_LICENSES;
  }

  set MAX_DYNAMIC_LICENSES(value: number) {
    this._MAX_DYNAMIC_LICENSES = value;
    localStorage.setItem('MAX_DYNAMIC_LICENSES', value.toString());
  }

  constructor(private dateService: CurrentDateService) {
    const savedMax = localStorage.getItem('MAX_DYNAMIC_LICENSES');
    if (savedMax) {
      this._MAX_DYNAMIC_LICENSES = parseInt(savedMax);
    }
  }

  canUserLogin(user: any): { allowed: boolean; reason?: string } {
    const today = this.dateService.getToday();
    const loginHistory = this.getLoginHistory();

    // Usuários fixos são sempre permitidos
    if (user.license === 'fixa' || user.isFixed) {
      return { allowed: true };
    }

    // Verifica se o usuário já logou hoje
    const alreadyLoggedToday = loginHistory.some(
      (login) => login.userName === user.Name && login.date === today
    );

    if (alreadyLoggedToday) {
      return { allowed: true };
    }

    // Conta usuários dinâmicos únicos que já logaram hoje
    const dynamicUsers = new Set(
      loginHistory
        .filter((login) => login.date === today && !login.isFixed)
        .map((login) => login.userName)
    );

    if (dynamicUsers.size >= this._MAX_DYNAMIC_LICENSES) {
      return {
        allowed: false,
        reason: `Limite de ${this._MAX_DYNAMIC_LICENSES} usuários dinâmicos atingido hoje.`
      };
    }

    return { allowed: true };
  }

  registerLogin(user: any): void {
    const loginHistory = this.getLoginHistory();
    const today = this.dateService.getToday();

    const alreadyLogged = loginHistory.some(
      (login) => login.userName === user.Name && login.date === today
    );

    if (!alreadyLogged) {
      loginHistory.push({
        userName: user.Name,
        date: today,
        isFixed: user.isFixed,
        timestamp: this.dateService.getNow().toISOString()
      });
      localStorage.setItem(this.LOGIN_HISTORY_KEY, JSON.stringify(loginHistory));
    }
  }

  private getLoginHistory(): any[] {
    return JSON.parse(localStorage.getItem(this.LOGIN_HISTORY_KEY) || '[]');
  }
}
