import { SavedUser } from '../interfaces/saved-user';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  @Input() user!: SavedUser;
}
