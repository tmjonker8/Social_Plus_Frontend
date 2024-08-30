import { SavedUser } from './../interfaces/saved-user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGeneratorService {

  private emptyUser: SavedUser = {
    email: undefined,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    imgPath: undefined
  }

  constructor() { 

  }

  returnEmptySavedUser() {

    return this.emptyUser;
  }
}
