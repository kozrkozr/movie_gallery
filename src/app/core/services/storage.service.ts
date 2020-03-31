import { Injectable } from '@angular/core';

export enum StorageKey {
  USERS = 'USERS',
  USER = 'USER',
  FAVORITE_MOVIES = 'FAVORITE_MOVIES'
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: StorageKey): T {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: StorageKey, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: StorageKey) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
