import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Media } from '../../types/media';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Options } from './options';

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
export class OptionsComponent implements OnInit, OnDestroy {
  @Output() updateListEvent = new EventEmitter<Media[]>();
  @ViewChild('search') search?: ElementRef;

  private subscriptions = new Subscription();
  private search$ = new Subject<string>();

  public activeTab: Options = Options.MOVIES;

  constructor(
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.getShows();

    this.subscriptions.add(this.search$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateList();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getMovies(): void {
    const searchInput = this.search?.nativeElement.value;
    this.activeTab = Options.MOVIES;
    if (searchInput && searchInput.length >= 3) {
      this.searchMovies(searchInput);
    } else {
      this.getTopMovies();
    }
  }

  public getTopMovies(): void {
    this.tmdbService.getTopMovies().subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }
  
  public searchMovies(searchInput: string): void {
    this.tmdbService.searchMovies(searchInput).subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }

  public getShows(): void {
    const searchInput = this.search?.nativeElement.value;
    this.activeTab = Options.TV_SHOWS;
    if (searchInput && searchInput.length >= 3) {
      this.searchShows(searchInput);
    } else {
      this.getTopShows();
    }
  }

  public getTopShows(): void {
    this.tmdbService.getTopShows().subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }

  public searchShows(searchInput: string): void {
    this.tmdbService.searchShows(searchInput).subscribe((data) => {
      this.updateListEvent.emit(data);
    })
  }

  public updateList() {
    if (this.activeTab === Options.MOVIES)
      this.getMovies();
    else
      this.getShows();
  }

  public emitSearchInput(event: Event) {
    // searchInput value is passed to make sure distinctUntilChanged properly prevents emissions of identical values
    const searchInput = (event.target as HTMLInputElement).value;
    this.search$.next(searchInput);
  }
}
