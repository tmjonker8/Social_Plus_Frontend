import { Username } from './../interfaces/username';
import { Email } from './../interfaces/email';
import { User } from './../interfaces/user';
import { RegisterService } from '../services/register.service';
import { Component, AfterViewChecked } from '@angular/core';
import { InputValidatorService } from '../services/input-validator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewChecked {
  user!: User;

  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;

  emailObject!: Email;
  usernameObject!: Username;

  emailExists: string = 'success';
  usernameExists: string = 'success';

  usernameInvalidMessage: string = 'Invalid username format, please try again!';
  emailInvalidMessage: string =
    'Please make sure your email address is valid, and then try again.';
  usernameExistsMessage: string =
    'An account with that username already exists.';
  emailExistsMessage: string =
    'An account with that email address already exists.';
  genericMessage: string =
    'There was an issue with your request.  Please try again!';

  constructor(
    private validatorService: InputValidatorService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewChecked(): void {
    if (this.email !== undefined && this.email !== null) {
      this.emailObject = {
        email: this.email.trim().toLowerCase(),
      };
    }

    if (this.username !== undefined && this.email !== null) {
      this.usernameObject = {
        username: this.username.trim().toLowerCase(),
      };
    }
  }

  testEmail() {
    if (this.email !== null)
      return this.validatorService.validateEmail(this.email);

    return false;
  }

  testUsername(): boolean {
    if (this.username === undefined) return false;

    return this.validatorService.validateUsername(this.username);
  }

  testDataComplete(): boolean {
    if (
      this.firstName !== '' &&
      this.firstName !== undefined &&
      this.lastName !== '' &&
      this.lastName !== undefined
    ) {
      return (
        this.validatorService.validatePasswords(
          this.password1,
          this.password2
        ) &&
        this.testEmail() &&
        this.testUsername()
      );
    }

    return false;
  }

  async handleSubmit() {
    this.user = {
      username: this.username.trim().toLowerCase(),
      email: this.email.trim().toLowerCase(),
      firstName: this.firstName.trim().toLowerCase(),
      lastName: this.lastName.trim().toLowerCase(),
      password1: this.password1,
      password2: this.password2,
    };

    if (
      this.validatorService.validatePasswords(this.password1, this.password2) &&
      this.testEmail() &&
      this.testUsername()
    ) {
      await this.registerService
        .postEmailCheckExists(this.emailObject)
        .then((value) => {
          this.emailExists = value;
        })
        .catch((error) => {
          this.emailExists = 'error';
        });

      await this.registerService
        .postUsernameCheckExists(this.usernameObject)
        .then((value) => {
          this.usernameExists = value;
        })
        .catch((error) => {
          this.usernameExists = 'error';
        });
    }

    if (this.emailExists === 'success' && this.usernameExists === 'success') {
      this.registerService.postRegistration(this.user);
      this.email = '';
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.password1 = '';
      this.password2 = '';
    }
  }
}
