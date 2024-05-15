export interface Media {
    mediaType: string;
    mediaList: MediaBasic[]
}

export interface MediaBasic {
    id: number;
    name?: string; // tv show 
    title?: string; // movie
    poster_path: string;
}

export interface MediaDetails extends MediaBasic {
    backdrop_path: string;
    genres: any[]
    overview: string;
    vote_average: number;
    origin_country: string[];
    tagline: string;
    status: string;

    // movie specific
    budget?: number;
    release_date?: string;
    runtime?: number;
    revenue?: number;

    // tv show specific
    first_air_date?: string;
    number_of_seasons?: string;
    number_of_episodes?: string;
    type?: string
}
