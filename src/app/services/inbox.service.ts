import { SignOutService } from './sign-out.service';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MessageReceived } from '../interfaces/message-received';
import { MessageSent } from '../interfaces/message-sent';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  messagesReceived!: MessageReceived[];

  constructor(private signOutService: SignOutService) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
  }

  private inboxCount!: number;

  async getMessagesReceived(): Promise<MessageReceived[]> {
    let username;
    if (localStorage.getItem('user') !== null) {
      username = JSON.parse(localStorage.getItem('user')!).username;
    }

    if (username !== undefined) {
      return await axios
        .get('http://localhost:8080/direct-message/' + username, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')!).token,
          },
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          this.signOutService.performSignOut();
          return;
        });
    }

    return Promise.reject([]);
  }

  async getMessagesSent(): Promise<MessageSent[]> {
    let username;
    if (localStorage.getItem('user') !== null) {
      username = JSON.parse(localStorage.getItem('user')!).username;
    }

    if (username !== undefined) {
      return await axios
        .get('http://localhost:8080/direct-message/sent/' + username, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')!).token,
          },
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          this.signOutService.performSignOut();
          return;
        });
    }

    return Promise.reject([]);
  }

  async transmitMessagesReceived(updatedMessagesReceived: string) {
    await axios
      .post(
        'http://localhost:8080/direct-message/read', updatedMessagesReceived, { 
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')!).token,
          },
        }
      )
      .then((response) => {
        console.log("transmitMessagesReceived" + response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setInboxCount() {
    this.getMessagesReceived().then((success) => {
      
      let counter = 0;

      for (let message of success) {
        if (!message.hasBeenRead) {
          counter++;
        }
      }
      this.count = counter;
      this.messagesReceived = success;
    });
  }

  set count(val: number) {
    this.inboxCount = val;
  }

  get count(): number {
    return this.inboxCount;
  }

  zeroInboxCount() {
    this.inboxCount = 0;

    let updatedMessagesReceived: MessageReceived[] = [];

    this.messagesReceived.forEach((message) => {
      message.hasBeenRead = true;
      updatedMessagesReceived.push(message);
    })

    this.transmitMessagesReceived(JSON.stringify(updatedMessagesReceived));
  }
}
