import { TestBed } from '@angular/core/testing';
import { TmdbService } from './tmdb.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TmdbServiceService', () => {
  let tmdbService: TmdbService;
  let httpTestingController: HttpTestingController; 

  const mockMediaList = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'media1',
        poster_path: 'mockPosterPath'
      },
      {
        id: 2,
        title: 'media2',
        poster_path: 'mockPosterPath'
      },
      {
        id: 3,
        title: 'media3',
        poster_path: 'mockPosterPath'
      }
    ]
  }

  const mockMediaId = 123;

  const mockMedia = {
    id: mockMediaId,
    title: 'mockTitle',
    poster_path: 'mockPosterPath',
    overview: 'mockOverview'
  }

  const mockSearchInput = 'mockSearchInput';

  const mockMediaVideos = {
    id: mockMediaId,
    results: [
      {
        name: "mockVideoName1",
        key: "mockVideoKey1",
        site: "mockVideoSite1",
        type: "mockVideoType1",
      },
      {
        name: "mockVideoName2",
        key: "mockVideoKey2",
        site: "mockVideoSite2",
        type: "mockVideoType2",
      },
      {
        name: "mockVideoName3",
        key: "mockVideoKey3",
        site: "mockVideoSite3",
        type: "mockVideoType3",
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    tmdbService = TestBed.inject(TmdbService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(tmdbService).toBeTruthy();
  });

  describe('getTopMovies', () => {
    it('should get 10 top movies', () => {
      let retrievedMovies = {};
      tmdbService.getTopMovies().subscribe((data) => {
        retrievedMovies = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/top_rated?api_key=${tmdbService.apiKey}&page=1`);
  
      request.flush(mockMediaList);
  
      expect(retrievedMovies).toEqual(mockMediaList);
    });

    it('getTopMovies should be a get request', () => {
      let retrievedMovies = {};
      tmdbService.getTopMovies().subscribe((data) => {
        retrievedMovies = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/top_rated?api_key=${tmdbService.apiKey}&page=1`);
      
  
      request.flush(mockMediaList);

      expect(request.request.method).toEqual('GET');
    })
  })

  describe('getTopShows', () => {
    it('should get 10 top tv shows', () => {
      let retrievedShows = {};
      tmdbService.getTopShows().subscribe((data) => {
        retrievedShows = data;
      });
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/top_rated?api_key=${tmdbService.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
  
      request.flush(mockMediaList);
  
      expect(retrievedShows).toEqual(mockMediaList);
    });

    it('getTopShows should be a get request', () => {
      let retrievedShows = {};
      tmdbService.getTopShows().subscribe((data) => {
        retrievedShows = data;
      });
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/top_rated?api_key=${tmdbService.apiKey}&page=1`);
  
      request.flush(mockMediaList);
  
      expect(request.request.method).toEqual('GET');
    });
  })

  describe('searchMovies', () => {
    it('should search for movies based on received query', () => {
      let retrievedMovies = {};
      tmdbService.searchMovies(mockSearchInput).subscribe((data) => {
        retrievedMovies = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/search/movie?api_key=${tmdbService.apiKey}&page=1&query=${mockSearchInput}`);
      expect(request.request.method).toEqual('GET');
  
      request.flush(mockMediaList);
      expect(retrievedMovies).toEqual(mockMediaList);
    });

    it('searchMovies should be a get request', () => {
      let retrievedMovies = {};
      tmdbService.searchMovies(mockSearchInput).subscribe((data) => {
        retrievedMovies = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/search/movie?api_key=${tmdbService.apiKey}&page=1&query=${mockSearchInput}`);
  
      request.flush(mockMediaList);

      expect(request.request.method).toEqual('GET');
    });
  })

  describe('searchShows', () => {
    it('should search for tv shows based on received query', () => {
      let retrievedShows = {};
      tmdbService.searchShows(mockSearchInput).subscribe((data) => {
        retrievedShows = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/search/tv?api_key=${tmdbService.apiKey}&page=1&query=${mockSearchInput}`);
  
      request.flush(mockMediaList);

      expect(retrievedShows).toEqual(mockMediaList);
    });

    it('searchShows should be a get request', () => {
      let retrievedShows = {};
      tmdbService.searchShows(mockSearchInput).subscribe((data) => {
        retrievedShows = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/search/tv?api_key=${tmdbService.apiKey}&page=1&query=${mockSearchInput}`);
  
      request.flush(mockMediaList);

      expect(request.request.method).toEqual('GET');
    });
  })

  describe('getMovieDetails', () => {
    it('should get details for movie based on received id', () => {
      let retrievedMovie = {};
      tmdbService.getMovieDetails(mockMediaId).subscribe((data) => {
        retrievedMovie = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/${mockMediaId}?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMedia);

      expect(retrievedMovie).toEqual(mockMedia);
    });

    it('getMovieDetails should be a get request', () => {
      let retrievedShows = {};
      tmdbService.getMovieDetails(mockMediaId).subscribe((data) => {
        retrievedShows = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/${mockMediaId}?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaList);

      expect(request.request.method).toEqual('GET');
    });
  })

  describe('getShowDetails', () => {
    it('should get details for tv show based on received id', () => {
      let retrievedMovie = {};
      tmdbService.getShowDetails(mockMediaId).subscribe((data) => {
        retrievedMovie = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/${mockMediaId}?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMedia);

      expect(retrievedMovie).toEqual(mockMedia);
    });

    it('getShowDetails should be a get request', () => {
      let retrievedShows = {};
      tmdbService.getShowDetails(mockMediaId).subscribe((data) => {
        retrievedShows = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/${mockMediaId}?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaList);

      expect(request.request.method).toEqual('GET');
    });
  })

  describe('getMovieVideos', () => {
    it('should get videos for movie based on received id', () => {
      let retrievedVideos = {};
      tmdbService.getMovieVideos(mockMediaId).subscribe((data) => {
        retrievedVideos = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/${mockMediaId}/videos?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaVideos);
  
      expect(retrievedVideos).toEqual(mockMediaVideos);
    });

    it('getMovieVideos should be a get request', () => {
      let retrievedVideos = {};
      tmdbService.getMovieVideos(mockMediaId).subscribe((data) => {
        retrievedVideos = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/movie/${mockMediaId}/videos?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaVideos);
  
      expect(request.request.method).toEqual('GET');
    });
  });

  describe('getShowVideos', () => {
    it('should get videos for tv show based on received id', () => {
      let retrievedVideos = {};
      tmdbService.getShowVideos(mockMediaId).subscribe((data) => {
        retrievedVideos = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/${mockMediaId}/videos?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaVideos);
  
      expect(retrievedVideos).toEqual(mockMediaVideos);
    });

    it('getMovieVideos should be a get request', () => {
      let retrievedVideos = {};
      tmdbService.getShowVideos(mockMediaId).subscribe((data) => {
        retrievedVideos = data;
      });
  
      const request = httpTestingController.expectOne(`${tmdbService.apiBaseUrl}/tv/${mockMediaId}/videos?api_key=${tmdbService.apiKey}`);
  
      request.flush(mockMediaVideos);
  
      expect(request.request.method).toEqual('GET');
    });
  });
});
