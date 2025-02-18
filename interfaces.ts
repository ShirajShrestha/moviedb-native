export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  genres: Genre[];
  runtime: number;
  vote_average: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface InfoScreenProps {
  navigation: any;
  route: {
    params: {
      id: number;
    };
  };
}
