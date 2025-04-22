import { Injectable } from '@angular/core';

// Marks this service as injectable and available throughout the application
@Injectable({
  providedIn: 'root' // Specifies that this service is provided at the root level
})
export class CurrentDateService {
    // Returns today's date as a string in the format 'YYYY-MM-DD'
    getToday(): string {
        // Checks if a simulated date is stored in localStorage
        const simulated = localStorage.getItem('simulatedDate');
        // If a simulated date exists, return it; otherwise, return today's date
        return simulated || new Date().toISOString().split('T')[0];
    }
      
    // Returns the current date as a Date object
    getNow(): Date {
        // Checks if a simulated date is stored in localStorage
        const simulated = localStorage.getItem('simulatedDate');
        // If a simulated date exists, return it as a Date object; otherwise, return the current date
        return simulated ? new Date(simulated) : new Date();
    }
}