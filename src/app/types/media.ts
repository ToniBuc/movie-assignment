export interface Media {
    mediaType: string;
    mediaList: MediaDetails[]
}

// should add more types to separate properties properly
export interface MediaDetails {
    adult: boolean;
    backdrop_path: string;
    genres: any[] // 
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name: string;
    origin_country: string[];
}
