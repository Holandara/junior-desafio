import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordPattern(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null; 

    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const isOnlySpaces = /^\s+$/.test(value);

    const valid = hasUppercase && hasDigit && !isOnlySpaces;

    return valid ? null : { passwordPattern: true };
  }

  static namePattern(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null; 

    //name is in local storage?
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const nameExists = users.some((user: { Name: string }) => user.Name === value);
    

    const hasOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);
    const hasSpaces = /\s/.test(value);

    
    const valid = hasOnlyAlphanumeric && !hasSpaces;
    const validChars = hasOnlyAlphanumeric && !hasSpaces;
    
    // returns error if name exists or has errors
    
    if (nameExists) {
      return { nameExists: true }; // name already taken
    }
    
    if (!validChars) {
      return { namePattern: true }; // has spaces or is alphanumeric
    }
    return null; // valid and unique
  }
}
