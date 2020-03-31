import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Movie } from '@core/types';

@Component({
  selector: 'app-movie-grid-item',
  styleUrls: ['movie-grid-item.component.scss'],
  templateUrl: 'movie-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieGridItemComponent {
  @Input() movie: Movie;
  @Output() selected = new EventEmitter<Movie>();
  @Output() favoriteStatusChanged = new EventEmitter<Movie>();
}
