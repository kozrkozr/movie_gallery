import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserFormModalComponent } from './components/modals/user-form-modal/user-form-modal.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteMoviesPipe } from './pipes/favorite-movies.pipe';
import { FilterByGenrePipe } from './pipes/filter-by-genre.pipe';
import { GridListControlComponent } from '@shared/components/form-controls/grid-list-control/grid-list-control.component';
import { MovieModalComponent } from '@shared/components/modals/movie-modal/movie-modal.component';

@NgModule({
  declarations: [
    UserFormModalComponent,
    MovieModalComponent,
    GridListControlComponent,
    FavoriteMoviesPipe,
    FilterByGenrePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbTooltipModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbTooltipModule,
    UserFormModalComponent,
    GridListControlComponent,
    FavoriteMoviesPipe,
    FilterByGenrePipe
  ]
})
export class SharedModule {}
