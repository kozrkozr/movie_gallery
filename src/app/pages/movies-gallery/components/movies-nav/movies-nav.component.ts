import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import Destroyable from '../../../../core/mixins/destroyable';
import { GridListValue } from '@shared/components/form-controls/grid-list-control/grid-list-control.component';

@Component({
  selector: 'app-movies-nav',
  templateUrl: 'movies-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesNavComponent extends Destroyable() implements OnInit {
  @Input() genres: string[] = [];
  @Output() genreChanged = new EventEmitter<string>();
  @Output() viewTypeChanged = new EventEmitter<GridListValue>();
  genreControl = new FormControl();
  gridListControl = new FormControl(GridListValue.GRID);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.genreControl.valueChanges
      .pipe(this.takeUntilDestroyed())
      .subscribe(genre => this.genreChanged.emit(genre));

    this.gridListControl.valueChanges
      .pipe(this.takeUntilDestroyed())
      .subscribe(type => this.viewTypeChanged.emit(type));
  }
}
