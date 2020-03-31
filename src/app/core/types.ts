export interface User {
  id?: string;
  email: string;
  name: string;
  password: string;
  favoriteMovies?: number[];
}

export interface Movie {
  id: number;
  name: string;
  img: string;
  description: string;
  year: number;
  genres: string[];
  director: string;
  starring: string[];
  isFavorite?: boolean;
}
