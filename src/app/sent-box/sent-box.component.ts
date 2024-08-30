import { SignOutService } from './../services/sign-out.service';
import { MessageSent } from '../interfaces/message-sent';
import { InboxService } from './../services/inbox.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sent-box',
  templateUrl: './sent-box.component.html',
  styleUrls: ['./sent-box.component.css']
})
export class SentBoxComponent {
  messagesSent!: MessageSent[];

  constructor(private inboxService: InboxService, private signOutService: SignOutService) {
    this.loadMessagesReceived();
  }

  async loadMessagesReceived() {
    await this.inboxService.getMessagesSent().then((success) => {
      this.messagesSent = success as MessageSent[];
      console.log(this.messagesSent);
    }).catch((error) => {
      this.signOutService.performSignOut();
    })
  }
}
