import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Media } from '../types/media';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  public apiBaseUrl: string = "https://api.themoviedb.org/3";
  public apiKey: string = "placeholderApiKey";

  constructor(private httpClient: HttpClient) { }

  public getMovies(): Observable<Media[]> {
    const params = {
      api_key: this.apiKey,
      page: 1
    }

    // page: 1 parameter returns 20 results
    // on first glance the api doesn't seem to provide a direct option to only get 10 
    // look into alternative/better way to achieve this 
    return this.httpClient.get(`${this.apiBaseUrl}/movie/top_rated`, {params}).pipe(
      map((data: any) => data.results.slice(0, 10))
    );
  }

  public getShows(): Observable<Media[]> {
    const params = {
      api_key: this.apiKey,
      page: 1
    }

    return this.httpClient.get(`${this.apiBaseUrl}/tv/top_rated`, {params}).pipe(
      map((data: any) => data.results.slice(0, 10))
    );
  }
}
