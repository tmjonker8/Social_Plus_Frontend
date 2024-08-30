import { UserGeneratorService } from './../services/user-generator.service';
import { SavedUser } from './../interfaces/saved-user';
import { SignOutService } from './../services/sign-out.service';
import { InboxService } from './../services/inbox.service';
import { Router } from '@angular/router';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Pages } from '../interfaces/pages';
import { Dropdown } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { UpdateService } from '../services/update.service';
import { SendMessageService } from '../services/send-message.service';
import { InputValidatorService } from '../services/input-validator.service';

@Component({
  selector: 'app-navbar-signed-in',
  templateUrl: './navbar-signed-in.component.html',
  styleUrls: ['./navbar-signed-in.component.css']
})
export class NavbarSignedInComponent implements OnInit {
  pages!: Pages;
  user!: SavedUser;
  firstName!: string;
  lastName!: string;
  recipient: string = '';
  subject!: string;
  body: string = '';
  password1: string = '';
  password2: string = '';

  messageTooLongWarning: string = "Your message exceed the set limit of 250 characters!";
  noRecipientEnteredWarning: string = "You must enter a recipient for your message!";

  constructor(
    private router: Router,
    public inboxService: InboxService,
    private signOutService: SignOutService,
    private userGenerator: UserGeneratorService,
    private updateService: UpdateService,
    private sendMessageService: SendMessageService,
    private validatorService: InputValidatorService
  ) {}

  ngOnInit(): void {
    document.getElementById('pi-link')!.onclick = (e) => e.preventDefault();
    document.getElementById('pw-link')!.onclick = (e) => e.preventDefault();
    document.getElementById('dm-link')!.onclick = (e) => e.preventDefault();
  }

  loadUser(): boolean {
    this.user = JSON.parse(localStorage.getItem('user')!);

    if (this.user !== null) {
      console.log(this.user);
      return true;
    }
    this.user = this.userGenerator.returnEmptySavedUser();
    return false;
  }

  handleSignOut() {
    this.signOutService.performSignOut();
  }
  // NEXT
  handleUpdateInfoSubmit() {
    console.log(this.firstName);
    this.updateService.updateUserInformation(
      this.user.username === undefined ? '' : this.user.username,
      this.firstName,
      this.lastName
    );
  }

  handleUpdatePasswordSubmit() {
    console.log(this.firstName);
    this.updateService.updatePassword(this.user.username!, this.password1);
    this.password1 = '';
    this.password2 = '';
  }

  handleSendMessageSubmit() {
    console.log(this.firstName);
    this.sendMessageService.sendMessage(
      this.user.username === undefined ? '' : this.user.username,
      this.recipient,
      this.subject,
      this.body
    );
  }

  setNameFields() {
    this.firstName = this.user.firstName!;
    this.lastName = this.user.lastName!;
  }

  testBody(): boolean {
    let counter = 0;

    for (let i = 0; i < this.body.length; i++) {
      counter++;

      if (counter > 250) {
        return false;
      }
    }
    return true;
  }

  testRecipient(): boolean {
    if (this.recipient.length < 1) {
      return false;
    }
    return true;
  }

  async getInboxCount() {
    return await this.inboxService
      .getMessagesReceived()
      .then((success) => {
        this.inboxService.count = success.length;
      })
      .catch((error) => {
        this.handleSignOut();
      });
  }

  populateUserName() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.firstName = this.user !== undefined && this.user !== null ? this.user.firstName! : '';
    this.lastName= this.user !== undefined && this.user !== null ? this.user.lastName! : '';
  }

  testMessageDataComplete(): boolean {
    if (
      this.recipient !== '' &&
      this.recipient !== undefined
    ) {
      return this.testBody();
    }
    return false;
  }

  testPasswordData(): boolean {

    return this.validatorService.validatePasswords(this.password1, this.password2)!;
  }
}
