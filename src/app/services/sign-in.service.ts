import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/credentials';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
  }

  async postSignIn(credentials: Credentials): Promise<string> {

    return await axios
      .post('http://localhost:8080/api/authenticate', JSON.stringify(credentials))
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.router.navigateByUrl("/(signedIn:member-home)");
        return Promise.resolve("success");
      })
      .catch((error) => {
        console.log(error.response.data);
        this.router.navigate(["/sign-in", {status: JSON.stringify("error.response.data")}]);
        return Promise.resolve(error.response.status)
      });
  }
}
