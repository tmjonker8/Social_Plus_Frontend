import { InputValidatorService } from './../services/input-validator.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pw-alert',
  templateUrl: './pw-alert.component.html',
  styleUrls: ['./pw-alert.component.css']
})
export class PwAlertComponent implements OnChanges {

  @Input() password1!: string;
  @Input() password2!: string;

  constructor(public validatorService: InputValidatorService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.password1);
  }

  testLength(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validatePasswordLength(this.password1);
  }

  testUpper(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validateUpperCase(this.password1);
  }

  testLower(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validateLowerCase(this.password1);
  }

  testMatch(): boolean {

    return this.validatorService.validateMatch(this.password1, this.password2);
  }
}
