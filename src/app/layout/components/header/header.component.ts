import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@core/types';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() currentUser: User;
  @Output() editUser = new EventEmitter<User>();
  @Output() logout = new EventEmitter();
}
