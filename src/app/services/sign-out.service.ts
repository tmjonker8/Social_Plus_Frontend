import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {

  constructor(private router:Router) { }

  performSignOut() {

    localStorage.clear();
    sessionStorage.clear();

    this.router.navigateByUrl('/sign-in');
  }
}
