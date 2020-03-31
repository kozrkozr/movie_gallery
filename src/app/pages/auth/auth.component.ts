import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { UserFormModalComponent } from '@shared/components/modals/user-form-modal/user-form-modal.component';
import Destroyable from '../../core/mixins/destroyable';
import { filterNonNil } from '@core/utils';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent extends Destroyable() implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.activatedRoute.url
      .pipe(
        map(data => data[0].path),
        switchMap(authType => {
          const userFormRef = this.modalService.open(UserFormModalComponent, {
            backdrop: 'static',
            centered: true
          });
          userFormRef.componentInstance.formType = authType;
          return from(userFormRef.result);
        }),
        filterNonNil(),
        this.takeUntilDestroyed()
      )
      .subscribe(result => this.router.navigate(['/']));
  }
}
