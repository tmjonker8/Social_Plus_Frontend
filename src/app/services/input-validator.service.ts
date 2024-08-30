import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {
  constructor() {}

  validateEmail(email: string): boolean {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    return regex.test(email);
  }

  validateTotalPassword(password: string): boolean {
    const regex = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    );

    return regex.test(password);
  }

  validatePasswordLength(password: string): boolean {
    const regex = new RegExp(/^.*(?=.{8,}).*$/g);

    return regex.test(password);
  }

  validateLowerCase(password: string): boolean {
    const regex = new RegExp(/^.*(?=.*[a-z]).*$/g);

    return regex.test(password);
  }

  validateUpperCase(password: string): boolean {
    const regex = new RegExp(/^.*(?=.*[A-Z]).*$/g);

    return regex.test(password);
  }

  validateUsername(username: string): boolean {
    const regex = new RegExp(
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    );

    return regex.test(username);
  }

  validateMatch(password1: string, password2: string): boolean {
    if (
      password1 === undefined ||
      password2 === undefined ||
      password1 === '' ||
      password2 === ''
    ) {
      return false;
    }
    return password1 === password2;
  }

  validatePasswords(password1: string, password2: string): boolean {
    if (password1 !== null && password2 !== null) {
      return (
        this.validateTotalPassword(password1) &&
        this.validateTotalPassword(password2) &&
        this.validateMatch(password1, password2)
      );
    }

    return false;
  }
}
