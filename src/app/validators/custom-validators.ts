import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordPattern(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null; // Deixa outros validadores tratarem se estiver vazio

    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const isOnlySpaces = /^\s+$/.test(value);

    const valid = hasUppercase && hasDigit && !isOnlySpaces;

    return valid ? null : { passwordPattern: true };
  }
  static namePattern(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null; // Deixa outros validadores tratarem se estiver vazio

    const hasOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);

    const hasSpaces = /\s/.test(value);

    const valid = hasOnlyAlphanumeric && !hasSpaces;

    return valid ? null : { namePattern: true };
  }
}
