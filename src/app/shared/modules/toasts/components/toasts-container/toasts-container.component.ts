import { Component, HostBinding } from '@angular/core';
import { ToastsService } from '@core/services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: 'toasts-container.component.html'
})
export class ToastsContainerComponent {
  constructor(public toastsService: ToastsService) {}

  @HostBinding('class.ngb-toasts') ngbToastsClass = true;
}
