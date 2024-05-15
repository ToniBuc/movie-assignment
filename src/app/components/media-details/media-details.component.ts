import { Component, Input, OnInit } from '@angular/core';
import { MediaDetails } from '../../types/media';
import { TmdbService } from '../../services/tmdb.service';
import { Options } from '../options/options';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss'
})
export class MediaDetailsComponent implements OnInit {
  @Input() id: number | undefined;
  @Input() mediaType: string | undefined;
  public media: MediaDetails | undefined;
  public trailerUrl: SafeUrl = '';

  constructor(
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {}

  public ngOnInit(): void {
    this.getMediaDetails();
    this.getMediaTrailer();
  }

  public getMediaDetails(): void {
    if (this.mediaType === Options.MOVIES) {
      this.tmdbService.getMovieDetails(<number>this.id).subscribe((data) => {
        this.media = data;
      });
    } else {
      this.tmdbService.getShowDetails(<number>this.id).subscribe((data) => {
        this.media = data;
      });
    }
  }

  public getMediaTrailer(): void {
    if (this.mediaType === Options.MOVIES) {
      this.tmdbService.getMovieVideos(<number>this.id).subscribe((data) => {
        this.buildTrailerUrl(data);
      })
    } else {
      this.tmdbService.getShowVideos(<number>this.id).subscribe((data) => {
        this.buildTrailerUrl(data);
      })
    }
  }

  public buildTrailerUrl(data: any): void {
    const trailer = data.results.find((e: any) => e.type === 'Trailer');

    if (trailer) {
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailer.key);
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
