import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  template: `<p>{{ message }}</p>`,
  providers: [NotificationService]
})
export class NotificationComponent {
  message: string;

  constructor(private notificationService: NotificationService) {
    // Component-level providers create a new service instance for this component and its children.
    // This creates a separate NotificationService instance scoped to this component tree,
    // which is useful when you need isolated state per component instance (e.g., form wizards with multiple steps).
    this.message = this.notificationService.getMessage();
  }
}
