import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private readonly MAX_DYNAMIC_LICENSES = 1; // Máximo de usuários dinâmicos distintos por dia
  private readonly LOGIN_HISTORY_KEY = 'loginHistory';

  canUserLogin(user: any): { allowed: boolean, reason?: string } {
    // Usuários fixos sempre podem logar
    if (!user.isFixed) {
      return { allowed: true };
    }

    const todayLogins = this.getTodayLogins();
    const userAlreadyLoggedToday = todayLogins.some(
      login => login.userName === user.Name
    );

    // Se já logou hoje, permite (não consome nova licença)
    if (userAlreadyLoggedToday) {
      return { allowed: true };
    }

    // Conta usuários dinâmicos distintos que já logaram hoje
    const uniqueDynamicUsersToday = this.countUniqueDynamicUsersToday(todayLogins);
    
    // Verifica se ainda há licenças disponíveis
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
    
    // Só registra o primeiro login do usuário no dia
    const userAlreadyLoggedToday = loginHistory.some(
      login => login.userName === user.Name && 
              login.date === this.getCurrentDateString()
    );

    if (!userAlreadyLoggedToday) {
      loginHistory.push({
        userName: user.Name,
        date: this.getCurrentDateString(),
        isDynamic: user.isFixed,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(this.LOGIN_HISTORY_KEY, JSON.stringify(loginHistory));
    }
  }

  private getLoginHistory(): any[] {
    return JSON.parse(localStorage.getItem(this.LOGIN_HISTORY_KEY) || '[]');
  }

  private getTodayLogins(): any[] {
    return this.getLoginHistory().filter(
      login => login.date === this.getCurrentDateString()
    );
  }

  private countUniqueDynamicUsersToday(logins: any[]): number {
    const dynamicUsers = new Set(
      logins
        .filter(login => login.isDynamic)
        .map(login => login.userName)
    );
    return dynamicUsers.size;
  }

  private getCurrentDateString(): string {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
}