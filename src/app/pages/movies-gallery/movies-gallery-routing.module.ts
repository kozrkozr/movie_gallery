import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MoviesGalleryComponent } from './movies-gallery.component';

export const routes: Routes = [
  {
    path: '',
    component: MoviesGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesGalleryRoutingModule {}
