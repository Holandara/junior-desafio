import { Injectable } from '@angular/core';
import { CurrentDateService } from './current-date.service';

// Marks this service as injectable and available throughout the application
@Injectable({
  providedIn: 'root' // Specifies that this service is provided at the root level
})
export class LicenseService {
 
   private _MAX_DYNAMIC_LICENSES = 0;
   // Key used to store login history in localStorage
   private readonly LOGIN_HISTORY_KEY = 'loginHistory';
 
   get MAX_DYNAMIC_LICENSES(): number {
     return this._MAX_DYNAMIC_LICENSES;
   }
 
   set MAX_DYNAMIC_LICENSES(value: number) {
     this._MAX_DYNAMIC_LICENSES = value;
     localStorage.setItem('MAX_DYNAMIC_LICENSES', value.toString());
   }
 
   constructor(private dateService: CurrentDateService) {
     // Load saved value from localStorage if it exists
     const savedMax = localStorage.getItem('MAX_DYNAMIC_LICENSES');
     if (savedMax) {
       this._MAX_DYNAMIC_LICENSES = parseInt(savedMax);
     }
   }

  // Determines if a user is allowed to log in
  canUserLogin(user: any): { allowed: boolean, reason?: string } {
    // If the user is not dynamic, allow login
    if (!user.isFixed) {
      return { allowed: true };
    }

    // Retrieves today's logins
    const todayLogins = this.getTodayLogins();
    // Checks if the user has already logged in today
    const userAlreadyLoggedToday = todayLogins.some(
      login => login.userName === user.Name
    );

    // If the user has already logged in today, allow login
    if (userAlreadyLoggedToday) {
      return { allowed: true };
    }

    // Counts the number of unique dynamic users who logged in today
    const uniqueDynamicUsersToday = this.countUniqueDynamicUsersToday(todayLogins);

    // If the maximum number of dynamic licenses is reached, deny login
    if (uniqueDynamicUsersToday >= this.MAX_DYNAMIC_LICENSES) {
      return {
        allowed: false,
        reason: `Limite de ${this.MAX_DYNAMIC_LICENSES} usuários dinâmicos atigindo hoje.`
      };
    }

    // Otherwise, allow login
    return { allowed: true };
  }

  // Registers a user's login in the login history
  registerLogin(user: any): void {
    // Retrieves the login history from localStorage
    const loginHistory = this.getLoginHistory();

    // Gets today's date
    const today = this.dateService.getToday();
    // Checks if the user has already logged in today
    const alreadyLogged = loginHistory.some(
      login => login.userName === user.Name &&
               login.date === today
    );

    // If the user has not logged in today, add their login to the history
    if (!alreadyLogged) {
      loginHistory.push({
        userName: user.Name, // The user's name
        date: today, // The date of the login
        isDynamic: user.isFixed, // Whether the user is dynamic or fixed
        timestamp: this.dateService.getNow().toISOString() // The timestamp of the login
      });

      // Updates the login history in localStorage
      localStorage.setItem(this.LOGIN_HISTORY_KEY, JSON.stringify(loginHistory));
    }
  }

  // Retrieves the login history from localStorage
  private getLoginHistory(): any[] {
    return JSON.parse(localStorage.getItem(this.LOGIN_HISTORY_KEY) || '[]');
  }

  // Retrieves the logins that occurred today
  private getTodayLogins(): any[] {
    return this.getLoginHistory().filter(
      login => login.date === this.dateService.getToday()
    );
  }

  // Counts the number of unique dynamic users who logged in today
  private countUniqueDynamicUsersToday(logins: any[]): number {
    // Filters the logins to include only dynamic users and creates a set of unique usernames
    const dynamicUsers = new Set(
      logins.filter(login => login.isDynamic).map(login => login.userName)
    );
    // Returns the size of the set, which represents the number of unique dynamic users
    return dynamicUsers.size;
  }
}