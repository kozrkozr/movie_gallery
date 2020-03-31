import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '@core/types';
import { MoviesService } from '@core/services/movies.service';

@Component({
  selector: 'app-movie-modal',
  styleUrls: ['movie-modal.component.scss'],
  templateUrl: 'movie-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieModalComponent {
  @Input() movie: Movie;

  constructor(private moviesService: MoviesService) {}

  changeFavoriteMovies(movie: Movie) {
    this.movie = { ...movie, isFavorite: !movie.isFavorite };
    this.moviesService.changeFavoriteMovies(movie);
  }
}
