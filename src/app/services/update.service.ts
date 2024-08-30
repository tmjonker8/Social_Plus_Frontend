import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserUpdates } from '../interfaces/user-updates';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PasswordUpdates } from '../interfaces/pw-updates';

@Injectable({
  providedIn: 'root'
})
// NEXT
export class UpdateService {

  private userUpdates!: UserUpdates;
  private passwordUpdates!: PasswordUpdates;

  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
   }

  updateUserInformation(un: string, fn: string, ln: string) {
    console.log(fn);
    this.userUpdates = {
      username: un,
      firstName: fn,
      lastName: ln,
      image: ''
    }

    this.postUpdates();
  }

  updatePassword(un: string, pw: string) {
    this.passwordUpdates = {
      username: un,
      password: pw
    }

    this.postPasswordUpdates();
  }

  private postUpdates() {
    axios
    .post('http://localhost:8080/update', JSON.stringify(this.userUpdates), {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("token")!).token
      }
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigateByUrl("/(signedIn:member-home)");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  private postPasswordUpdates() {
    axios
    .post('http://localhost:8080/change-pw', JSON.stringify(this.passwordUpdates), {
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
