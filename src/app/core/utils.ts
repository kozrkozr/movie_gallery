import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Movie } from './types';

export const nonNil = (val: any): boolean => val !== null && val !== undefined;
export const filterNonNil = <T>(): MonoTypeOperatorFunction<T> =>
  filter(nonNil);

export const setMoviesFavoriteProp = (favoriteMoviesIds: number[]) => (
  movie: Movie
) => ({
  ...movie,
  isFavorite: !!favoriteMoviesIds.find(id => id === movie.id)
});

export const generateId = () => `f${(+new Date()).toString(16)}`;

export const firstLetterUpperCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const compareStrings = (value: string) => (stringToCheck: string) =>
  value.toLowerCase() === stringToCheck.toLowerCase();

export const generateMovieGenres = (movies: Movie[]) =>
  movies.reduce(
    (accum, movie) => [
      ...accum,
      ...movie.genres
        .filter(genre => !accum.find(compareStrings(genre)))
        .map(firstLetterUpperCase)
    ],
    []
  );
