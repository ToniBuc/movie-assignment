import { Component } from '@angular/core';
import { OptionsComponent } from '../options/options.component';
import { Media, MediaDetails } from '../../types/media';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    OptionsComponent,
    ListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // consider simplifying the app structure by moving the list component logic to the home component
  public mediaType: string = '';
  public mediaList: MediaDetails[] = [];

  constructor() {}

  public setList(newMedia: Media): void {
    this.mediaType = newMedia.mediaType;
    this.mediaList = newMedia.mediaList;
    console.log(this.mediaList);
  }
}
