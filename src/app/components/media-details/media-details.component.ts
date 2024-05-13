import { Component, Input, OnInit } from '@angular/core';
import { MediaDetails } from '../../types/media';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss'
})
export class MediaDetailsComponent implements OnInit {
  @Input() id: number | undefined;
  @Input() mediaType: string | undefined;
  public media: MediaDetails | undefined;

  constructor(
    private tmdbService: TmdbService
  ) {}

  public ngOnInit(): void {
    this.getMediaDetails();
  }

  public getMediaDetails(): void {
    if (this.mediaType === 'movie') {
      this.tmdbService.getMovieDetails(<number>this.id).subscribe((data) => {
        this.media = data;
      });
    } else {
      this.tmdbService.getShowDetails(<number>this.id).subscribe((data) => {
        this.media = data;
      });
    }
  }
}
