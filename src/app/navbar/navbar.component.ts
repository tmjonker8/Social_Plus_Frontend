import { Pages } from './../interfaces/pages';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  pages!: Pages;

  constructor() {
    // this.pages = JSON.parse(sessionStorage.getItem('pages')!);

    if (this.pages === undefined) {
      this.pages = {
        signIn: true,
        register: false,
        about: false,
      };
    } else {
      this.pages = {
        signIn: this.pages.signIn,
        register: this.pages.register,
        about: this.pages.about,
      };
    }
  }
  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    // sessionStorage.setItem('pages', JSON.stringify(this.pages));
  }

  toggleRegister() {
    this.pages = {
      signIn: false,
      register: true,
      about: false,
    };
  }

  toggleAbout() {
    this.pages = {
      signIn: false,
      register: false,
      about: true,
    };
  }

  toggleSignIn() {
    this.pages = {
      signIn: true,
      register: false,
      about: false,
    };
  }
}
