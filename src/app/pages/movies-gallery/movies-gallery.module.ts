import { NgModule } from '@angular/core';
import { MoviesGalleryComponent } from './movies-gallery.component';
import { SharedModule } from '@shared/shared.module';
import { MoviesGalleryRoutingModule } from './movies-gallery-routing.module';
import { FavoriteMoviesListComponent } from './components/favorite-movies-list/favorite-movies-list.component';
import { MoviesNavComponent } from './components/movies-nav/movies-nav.component';
import { MovieGridItemComponent } from '@pages/movies-gallery/components/movie-grid-item/movie-grid-item.component';
import { MovieListItemComponent } from '@pages/movies-gallery/components/movie-list-item/movie-list-item.component';

@NgModule({
  declarations: [
    MoviesGalleryComponent,
    MovieGridItemComponent,
    MovieListItemComponent,
    FavoriteMoviesListComponent,
    MoviesNavComponent
  ],
  imports: [SharedModule, MoviesGalleryRoutingModule]
})
export class MoviesGalleryModule {}
