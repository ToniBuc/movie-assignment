import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MediaBasic } from '../types/media';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  public apiBaseUrl: string = "https://api.themoviedb.org/3";
  public apiKey: string = "placeholderApiKey";

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves the top 10 rated movies 
   * @returns
   */
  public getTopMovies(): Observable<MediaBasic[]> {
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

  /**
   * Retrieves the top 10 rated shows
   * @returns
   */
  public getTopShows(): Observable<MediaBasic[]> {
    const params = {
      api_key: this.apiKey,
      page: 1
    }

    return this.httpClient.get(`${this.apiBaseUrl}/tv/top_rated`, {params}).pipe(
      map((data: any) => data.results.slice(0, 10))
    );
  }

  // consider reducing the search methods to one with a parameter that will determine which media type will be returned 
  /**
   * Retrieves movies filtered by their name
   * @param searchInput the query to filter by
   * @returns 
   */
  public searchMovies(searchInput: string): Observable<MediaBasic[]> {
    const params = {
      api_key: this.apiKey,
      page: 1,
      query: searchInput
    }

    return this.httpClient.get(`${this.apiBaseUrl}/search/movie`, {params}).pipe(
      map((data: any) => data.results.slice(0, 10))
    );
  }

  /**
   * Retrieves shows filtered by their name 
   * @param searchInput the query to filter by
   * @returns 
   */
  public searchShows(searchInput: string): Observable<MediaBasic[]> {
    const params = {
      api_key: this.apiKey,
      page: 1,
      query: searchInput
    }

    return this.httpClient.get(`${this.apiBaseUrl}/search/tv`, {params}).pipe(
      map((data: any) => data.results.slice(0, 10))
    );
  }

  // consider reducing the get details methods to one with a parameter that will determine which media type will be returned 
  /**
   * Retrieves details for the movie with the specified id
   * @param id id of movie
   * @returns 
   */
  public getMovieDetails(id: number): Observable<any> {
    const params = {
      api_key: this.apiKey,
    }

    return this.httpClient.get(`${this.apiBaseUrl}/movie/${id}`, {params});
  }

  /**
   * Retrieves details for the show with the specified id
   * @param id id of show
   * @returns 
   */
  public getShowDetails(id: number): Observable<any> {
    const params = {
      api_key: this.apiKey,
    }

    return this.httpClient.get(`${this.apiBaseUrl}/tv/${id}`, {params});
  }

  // consider reducing the get videos methods to one with a parameter that will determine which media type will be returned
  /**
   * Retrieves videos for the movie with the specified id
   * @param id id of movie
   * @returns 
   */
  public getMovieVideos(id: number): Observable<any> {
    const params = {
      api_key: this.apiKey,
    }

    return this.httpClient.get(`${this.apiBaseUrl}/movie/${id}/videos`, {params});
  }

  /**
   * Retrieves videos for the show with the specified id
   * @param id id of show 
   * @returns 
   */
  public getShowVideos(id: number): Observable<any> {
    const params = {
      api_key: this.apiKey,
    }

    return this.httpClient.get(`${this.apiBaseUrl}/tv/${id}/videos`, {params});
  }
}
