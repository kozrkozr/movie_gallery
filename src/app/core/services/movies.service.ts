import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Movie, User } from '../types';
import { map, tap } from 'rxjs/operators';
import { generateMovieGenres, setMoviesFavoriteProp } from '../utils';
import { StorageKey, StorageService } from './storage.service';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly MOVIES_URL =
    'http://my-json-server.typicode.com/moviedb-tech/movies/list';
  private genres$ = new BehaviorSubject<string[]>([]);

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<Movie[]>(this.MOVIES_URL)
      .pipe(tap(movies => this.genres$.next(generateMovieGenres(movies))));
  }

  getSingleMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.MOVIES_URL}/${id}`);
  }

  getAllGenres(): Observable<string[]> {
    return this.genres$.asObservable();
  }

  getMoviesWithFavoriteProp(): Observable<Movie[]> {
    return combineLatest([
      this.getAllMovies(),
      this.authService.getUserFavoriteMovies()
    ]).pipe(
      map(([allMovies, favoriteMovies]) =>
        allMovies.map(setMoviesFavoriteProp(favoriteMovies))
      )
    );
  }

  changeFavoriteMovies(movie: Movie) {
    const currentUser = this.storageService.getItem<User>(StorageKey.USER);
    const userFavoritesMovies = currentUser.favoriteMovies;
    this.authService.updateCurrentUser({
      ...currentUser,
      favoriteMovies: !movie.isFavorite
        ? [...userFavoritesMovies, movie.id]
        : userFavoritesMovies.filter(id => id !== movie.id)
    });
  }
}
