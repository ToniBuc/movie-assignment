import { Component, Input } from '@angular/core';
import { MediaDetails } from '../../types/media';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  // consider simplifying the app structure by moving the list component logic to the home component
  @Input() mediaType: string = '';
  @Input() mediaList: MediaDetails[] = [];
  public imgBaseUrl: string = "https://image.tmdb.org/t/p/w500";

  constructor() { }
}
