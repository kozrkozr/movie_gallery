import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';

@NgModule({
  declarations: [ToastsContainerComponent],
  imports: [NgbToastModule, CommonModule],
  exports: [NgbToastModule, ToastsContainerComponent]
})
export class ToastsModule {}
