import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Movie } from '@core/types';

@Component({
  selector: 'app-favorite-movies-list',
  templateUrl: 'favorite-movies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteMoviesListComponent {
  @Input() movies: Movie[] = [];
  @Output() removed = new EventEmitter<Movie>();
}
