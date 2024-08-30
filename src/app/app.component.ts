import { SavedUser } from './interfaces/saved-user';
import { Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: SavedUser;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user")!);
    if (!this.userIsNull()) {
      this.router.navigateByUrl("/(signedIn:member-home)");
    } else {
      this.router.navigateByUrl("/sign-in");
    }
  }

  userIsNull():boolean {

    this.user = JSON.parse(localStorage.getItem("user")!);
    
    return this.user === undefined || this.user === null;
  }
}
