import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Message } from '../interfaces/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  message!: Message;

  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
   }

  sendMessage(fr: string, recip: string, sub: string, bdy: string) {
    this.message = {
      from: fr,
      to: recip,
      subject: sub.length > 0 ? sub : "[No Subject]",
      body: bdy
    }

    console.log(this.message.from + " " + this.message.to);
    this.postMessage();
  }

  postMessage() {
    axios
    .post('http://localhost:8080/direct-message', JSON.stringify(this.message), {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("token")!).token
      }
    })
    .then((response) => {
      console.log(response);
      this.router.navigateByUrl("/(signedIn:member-home)");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }
}
