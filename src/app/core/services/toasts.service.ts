import { Injectable } from '@angular/core';

export enum ToastType {
  SUCCESS = 'bg-primary',
  ERROR = 'bg-danger',
  WARN = 'bg-warning',
  INFO = 'bg-info'
}

@Injectable({ providedIn: 'root' })
export class ToastsService {
  toasts: any[] = [];

  show(message: string, type: ToastType = ToastType.SUCCESS, delay = 5000) {
    this.toasts.push({ message, type, delay });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
