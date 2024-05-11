import { Component, Input } from '@angular/core';
import { Media } from '../../types/media';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() mediaList: Media[] = [];
  public imgBaseUrl: string = "https://image.tmdb.org/t/p/w500";

  constructor() { }
}
