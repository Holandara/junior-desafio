import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {
    getToday(): string {
        const simulated = localStorage.getItem('simulatedDate');
        return simulated || new Date().toISOString().split('T')[0];
      }
      
      getNow(): Date {
        const simulated = localStorage.getItem('simulatedDate');
        return simulated ? new Date(simulated) : new Date();
      }
      
}
