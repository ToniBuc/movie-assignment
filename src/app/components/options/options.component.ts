import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Media } from '../../types/media';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Options } from './options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit, OnDestroy {
  @Output() updateListEvent = new EventEmitter<Media>();

  private subscriptions = new Subscription();
  private search$ = new Subject<string>();

  public activeTab: Options = Options.TV_SHOWS;
  public searchInput: string = '';

  constructor(
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.getState();

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

  /**
   * Gets data for the state of the list, including any filters that were applied previously 
   * if we are navigating back to the list from the media details page.
   */
  public getState(): void {
    this.activeTab = <Options>this.tmdbService.getActiveTab();
    this.searchInput = <string>this.tmdbService.getSearchInput();
    if (this.activeTab === Options.MOVIES)
      this.getMovies();
    else
      this.getShows();
  }

  public getMovies(): void {
    this.activeTab = Options.MOVIES;
    this.tmdbService.setActiveTab(this.activeTab);

    if (this.searchInput && this.searchInput.length >= 3) {
      this.searchMovies();
    } else {
      this.getTopMovies();
    }
  }

  public getTopMovies(): void {
    this.tmdbService.getTopMovies().subscribe((data) => {
      this.updateListEvent.emit({mediaType: this.activeTab, mediaList: data});
    })
  }
  
  public searchMovies(): void {
    this.tmdbService.searchMovies(this.searchInput).subscribe((data) => {
      this.updateListEvent.emit({mediaType: this.activeTab, mediaList: data});
    })
  }

  public getShows(): void {
    this.activeTab = Options.TV_SHOWS;
    this.tmdbService.setActiveTab(this.activeTab);

    if (this.searchInput && this.searchInput.length >= 3) {
      this.searchShows();
    } else {
      this.getTopShows();
    }
  }

  public getTopShows(): void {
    this.tmdbService.getTopShows().subscribe((data) => {
      this.updateListEvent.emit({mediaType: this.activeTab, mediaList: data});
    })
  }

  public searchShows(): void {
    this.tmdbService.searchShows(this.searchInput).subscribe((data) => {
      this.updateListEvent.emit({mediaType: this.activeTab, mediaList: data});
    })
  }

  public updateList() {
    if (this.activeTab === Options.MOVIES)
      this.getMovies();
    else
      this.getShows();
  }

  public emitSearchInput(event: Event) {
    // searchInput value is passed to the search subject to make sure distinctUntilChanged properly prevents emissions of identical values
    this.searchInput = (event.target as HTMLInputElement).value;
    this.tmdbService.setSearchInput(this.searchInput);
    this.search$.next(this.searchInput);
  }
}
