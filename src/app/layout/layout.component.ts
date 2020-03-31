import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@core/types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormModalComponent } from '@shared/components/modals/user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.getUserInfo();
  }

  editUser(user: User) {
    const userModalRef = this.modalService.open(UserFormModalComponent);
    userModalRef.componentInstance.user = user;
  }

  logout() {
    this.authService.logout();
  }
}
