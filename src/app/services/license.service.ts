// src/app/services/license.service.ts
import { Injectable } from '@angular/core';
import { CurrentDateService } from './current-date.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private readonly MAX_DYNAMIC_LICENSES = 1;
  private readonly LOGIN_HISTORY_KEY = 'loginHistory';

  constructor(private dateService: CurrentDateService) {}

  canUserLogin(user: any): { allowed: boolean, reason?: string } {
    if (!user.isFixed) {
      return { allowed: true };
    }

    const todayLogins = this.getTodayLogins();
    const userAlreadyLoggedToday = todayLogins.some(
      login => login.userName === user.Name
    );

    if (userAlreadyLoggedToday) {
      return { allowed: true };
    }

    const uniqueDynamicUsersToday = this.countUniqueDynamicUsersToday(todayLogins);

    if (uniqueDynamicUsersToday >= this.MAX_DYNAMIC_LICENSES) {
      return {
        allowed: false,
        reason: `Limite de ${this.MAX_DYNAMIC_LICENSES} usuários dinâmicos atingido hoje.`
      };
    }

    return { allowed: true };
  }

  registerLogin(user: any): void {
    const loginHistory = this.getLoginHistory();

    const today = this.dateService.getToday();
    const alreadyLogged = loginHistory.some(
      login => login.userName === user.Name &&
               login.date === today
    );

    if (!alreadyLogged) {
      loginHistory.push({
        userName: user.Name,
        date: today,
        isDynamic: user.isFixed,
        timestamp: this.dateService.getNow().toISOString()
      });

      localStorage.setItem(this.LOGIN_HISTORY_KEY, JSON.stringify(loginHistory));
    }
  }

  private getLoginHistory(): any[] {
    return JSON.parse(localStorage.getItem(this.LOGIN_HISTORY_KEY) || '[]');
  }

  private getTodayLogins(): any[] {
    return this.getLoginHistory().filter(
      login => login.date === this.dateService.getToday()
    );
  }

  private countUniqueDynamicUsersToday(logins: any[]): number {
    const dynamicUsers = new Set(
      logins.filter(login => login.isDynamic).map(login => login.userName)
    );
    return dynamicUsers.size;
  }
}
