import { Username } from './../interfaces/username';
import { Email } from './../interfaces/email';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
  }

  postRegistration(user: User) {
    axios
      .post('http://localhost:8080/api/register', JSON.stringify(user))
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigateByUrl("/(signedIn:member-home)");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async postEmailCheckExists(email: Email): Promise<string> {
    return await axios
      .post('http://localhost:8080/api/email', JSON.stringify(email))
      .then((response) => {
        return Promise.resolve("success");
      })
      .catch(async (error) => {
        console.log(error);
        return Promise.resolve(error.response.status);
      });
  }

  async postUsernameCheckExists(username: Username): Promise<string> {
    return await axios
      .post('http://localhost:8080/api/username', JSON.stringify(username))
      .then((response) => {
        return Promise.resolve("success");
      })
      .catch(async (error) => {
        return Promise.resolve(error.response.status);
      });
  }
}
