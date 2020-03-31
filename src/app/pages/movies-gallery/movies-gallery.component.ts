import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '@core/services/movies.service';
import { Movie } from '@core/types';
import { GridListValue } from '@shared/components/form-controls/grid-list-control/grid-list-control.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieModalComponent } from '@shared/components/modals/movie-modal/movie-modal.component';

@Component({
  selector: 'app-movies-gallery',
  templateUrl: 'movies-gallery.component.html'
})
export class MoviesGalleryComponent implements OnInit {
  movies$: Observable<Movie[]>;
  genres$: Observable<string[]>;
  selectedGenre: string;
  selectedViewType: GridListValue = GridListValue.GRID;
  viewTypes = GridListValue;

  constructor(
    private moviesService: MoviesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.movies$ = this.moviesService.getMoviesWithFavoriteProp();
    this.genres$ = this.moviesService.getAllGenres();
  }

  changeFavoriteMovies(movie: Movie) {
    this.moviesService.changeFavoriteMovies(movie);
  }

  selectGenre(genre: string | null) {
    this.selectedGenre = genre;
  }

  setColClass() {
    return this.selectedViewType === GridListValue.GRID
      ? 'col-sm-6 col-md-4 col-lg-3'
      : 'col-12';
  }

  openMovieDetailsModal(movie: Movie) {
    const movieModalRef = this.modalService.open(MovieModalComponent, {
      size: 'xl'
    });
    movieModalRef.componentInstance.movie = { ...movie };
  }
}
