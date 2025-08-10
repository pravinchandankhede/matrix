import { Component, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() profileClick = new EventEmitter<void>();

    constructor(public notificationService: NotificationService) { }

    get unreadNotificationCount(): number {
        return this.notificationService.getUnreadCount();
    }

    toggleNotifications(): void {
        this.notificationService.toggleNotificationPanel();
    }
}
