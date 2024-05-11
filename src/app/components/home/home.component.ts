import { Component } from '@angular/core';
import { OptionsComponent } from '../options/options.component';
import { Media } from '../../types/media';
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
  public mediaList: Media[] = [];

  constructor() {}

  public setList(newList: Media[]): void {
    this.mediaList = newList;
    console.log(this.mediaList);
  }
}
