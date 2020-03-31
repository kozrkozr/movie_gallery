import { Pipe, PipeTransform } from '@angular/core';
import { compareStrings } from '@core/utils';
import { Movie } from '@core/types';

@Pipe({
  name: 'appFilterByGenre'
})
export class FilterByGenrePipe implements PipeTransform {
  transform(value: Movie[], genre: string | null): any {
    return genre
      ? value.filter(movie => !!movie.genres.find(compareStrings(genre)))
      : value;
  }
}
