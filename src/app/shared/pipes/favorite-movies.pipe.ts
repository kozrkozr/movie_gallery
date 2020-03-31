import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '@core/types';

@Pipe({
  name: 'appFavoriteMovies'
})
export class FavoriteMoviesPipe implements PipeTransform {
  transform(value: Movie[]): any {
    return value.filter(movie => movie.isFavorite);
  }
}
