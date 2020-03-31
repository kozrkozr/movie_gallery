import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/types';

export enum FormType {
  LOGIN = 'login',
  REGISTER = 'register',
  EDIT = 'edit'
}

export enum UserFormFields {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  FAVORITE_MOVIES = 'favoriteMovies'
}

export const generateUserForm = (formBuilder: FormBuilder, user: User) =>
  formBuilder.group({
    [UserFormFields.ID]: [user && user.id],
    [UserFormFields.NAME]: [user && user.name],
    [UserFormFields.EMAIL]: [
      user && user.email,
      [Validators.required, Validators.email]
    ],
    [UserFormFields.PASSWORD]: [
      user && user.password,
      [Validators.required, Validators.minLength(6)]
    ],
    [UserFormFields.FAVORITE_MOVIES]: [(user && user.favoriteMovies) || []]
  });
