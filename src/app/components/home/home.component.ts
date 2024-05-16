import { Component } from '@angular/core';
import { Media, MediaBasic } from '../../types/media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // consider simplifying the app structure by moving the list component logic to the home component
  public mediaType: string = '';
  public mediaList: MediaBasic[] = [];

  constructor() {}

  public setList(newMedia: Media): void {
    this.mediaType = newMedia.mediaType;
    // on first glance the api doesn't seem to provide a direct option to only get 10, the page parameter when set to 1 returns 20 
    this.mediaList = newMedia.mediaList.slice(0, 10);
  }
}
