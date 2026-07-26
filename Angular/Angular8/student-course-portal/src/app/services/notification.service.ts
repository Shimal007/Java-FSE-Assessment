import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  getMessage(): string {
    return 'This notification service is scoped to its component instance.';
  }
}
