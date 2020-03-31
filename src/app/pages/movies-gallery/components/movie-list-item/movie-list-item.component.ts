import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Movie } from '@core/types';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: 'movie-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListItemComponent {
  @Input() movie: Movie;
  @Output() selected = new EventEmitter<Movie>();
  @Output() favoriteStatusChanged = new EventEmitter<Movie>();
}
