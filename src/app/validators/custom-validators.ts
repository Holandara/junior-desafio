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

    // Verifica se o nome já existe no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const nameExists = users.some((user: { Name: string }) => user.Name === value);
    
    // Verifica se o nome é alfanumérico e não tem espaços
    const hasOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);
    const hasSpaces = /\s/.test(value);

    // Validação de caracteres e espaços
    const valid = hasOnlyAlphanumeric && !hasSpaces;

    
    // Se o nome for inválido ou já existir, retorna erro
    
    if (!valid) {
      return { namePattern: true }; // Nome não é alfanumérico ou contém espaços
    }
    
    return null; // Nome válido e único
  }
}
