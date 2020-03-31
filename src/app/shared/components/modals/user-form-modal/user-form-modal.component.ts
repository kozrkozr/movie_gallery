import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormType,
  generateUserForm,
  UserFormFields
} from './user-form-modal.common';
import { User } from '@core/types';
import { AuthService } from '@core/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Destroyable from '../../../../core/mixins/destroyable';
import { filterNonNil } from '@core/utils';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: 'user-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormModalComponent extends Destroyable() implements OnInit {
  formTypes = FormType;
  userForm: FormGroup;
  userFormFields = UserFormFields;
  submitted = false;
  @Input() formType: FormType;
  @Input() user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.user) {
      this.formType = FormType.EDIT;
    }
    this.userForm = generateUserForm(this.formBuilder, this.user);
  }

  get isAuthFormType() {
    return (
      this.formType === FormType.LOGIN || this.formType === FormType.REGISTER
    );
  }

  get formTitle() {
    if (this.isAuthFormType) {
      return this.formType === FormType.LOGIN ? 'Sign in' : 'Sign up';
    }
    return 'Edit';
  }

  isControlInvalid(controlName: UserFormFields) {
    return (
      this.userForm.get(controlName).touched &&
      this.userForm.get(controlName).invalid
    );
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    this.authService[this.formType](this.userForm.value)
      .pipe(
        filterNonNil(),
        this.takeUntilDestroyed()
      )
      .subscribe(user => {
        this.activeModal.close(user);
      });
  }
}
