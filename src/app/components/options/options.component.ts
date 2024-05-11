import { Component, EventEmitter, Output } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Media } from '../../types/media';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  providers: [
    TmdbService
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {
  @Output() updateListEvent = new EventEmitter<Media[]>();

  constructor(
    private tmdbService: TmdbService
  ) {}

  public getMovies(): void {
    this.tmdbService.getMovies().subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }

  public getShows(): void {
    this.tmdbService.getShows().subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }
}
