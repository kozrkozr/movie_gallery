import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { User } from '../types';
import { StorageKey, StorageService } from './storage.service';
import { ToastsService, ToastType } from './toasts.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { generateId } from '@core/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorizedSubject$ = new BehaviorSubject<boolean>(false);
  private userInfo$ = new BehaviorSubject<User>(null);
  redirectUrl = null;

  constructor(
    private storageService: StorageService,
    private toastsService: ToastsService,
    private router: Router
  ) {
    const currentUser = this.storageService.getItem<User | null>(
      StorageKey.USER
    );
    if (currentUser) {
      this.updateCurrentUser(currentUser);
      this.isAuthorizedSubject$.next(true);
    }
  }

  login(user: User): Observable<User> {
    const foundedUser = Object.values(this.getUsersList()).find(
      u => u.email === user.email && u.password === user.password
    );
    if (foundedUser) {
      this.toastsService.show(`Welcome back ${foundedUser.name}`);
      this.updateCurrentUser(foundedUser);
      this.isAuthorizedSubject$.next(true);
      return of(foundedUser);
    }
    this.toastsService.show('Incorrect email or password', ToastType.ERROR);
    return EMPTY;
  }

  register(user: User): Observable<User> {
    const createdUser = this.createUser(user);
    if (createdUser) {
      this.isAuthorizedSubject$.next(true);
      this.toastsService.show('Registration successfully completed');
      return of(createdUser);
    } else {
      this.toastsService.show(
        'User with that email already exists',
        ToastType.WARN
      );
      return EMPTY;
    }
  }

  edit(user: User): Observable<User> {
    this.updateCurrentUser(user);
    this.toastsService.show('Profile successfully edited');
    return of(user);
  }

  logout() {
    this.storageService.removeItem(StorageKey.USER);
    this.isAuthorizedSubject$.next(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject$.asObservable();
  }

  getUserInfo(): Observable<User> {
    return this.userInfo$.asObservable();
  }

  getUserFavoriteMovies(): Observable<number[]> {
    return this.userInfo$
      .asObservable()
      .pipe(map(({ favoriteMovies }) => favoriteMovies));
  }

  getUsersList(): { [key: string]: User } {
    return this.storageService.getItem(StorageKey.USERS) || {};
  }

  updateUsersList(users: { [key: string]: User }) {
    this.storageService.setItem(StorageKey.USERS, users);
  }

  updateCurrentUser(user: User) {
    const usersList = this.getUsersList();
    this.updateUsersList({ ...usersList, [user.id]: user });
    this.saveUserInfo(user);
  }

  createUser(user: User) {
    const usersList = this.getUsersList();
    if (Object.values(usersList).find(u => u.email === user.email)) {
      return false;
    }
    const newUser = { ...user, id: generateId() };
    this.updateUsersList({ ...usersList, [newUser.id]: newUser });
    this.saveUserInfo(newUser);
    return newUser;
  }

  saveUserInfo(user: User) {
    this.userInfo$.next(user);
    this.storageService.setItem(StorageKey.USER, user);
  }
}
