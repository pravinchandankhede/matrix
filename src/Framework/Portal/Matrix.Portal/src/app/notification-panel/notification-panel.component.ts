import { Component, HostListener } from '@angular/core';
import { NotificationService, NotificationItem } from '../../services/notification.service';

@Component({
    selector: 'app-notification-panel',
    standalone: false,
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent {

    constructor(public notificationService: NotificationService) { }

    get isOpen(): boolean {
        return this.notificationService.isNotificationPanelOpen();
    }

    get notifications(): NotificationItem[] {
        return this.notificationService.notifications();
    }

    get unreadCount(): number {
        return this.notificationService.getUnreadCount();
    }

    closePanel(): void {
        // Add closing animation
        const panel = document.querySelector('.notification-panel');
        if (panel) {
            panel.classList.add('closing');
            setTimeout(() => {
                this.notificationService.closeNotificationPanel();
            }, 200);
        } else {
            this.notificationService.closeNotificationPanel();
        }
    }

    markAsRead(notification: NotificationItem): void {
        if (!notification.isRead) {
            this.notificationService.markAsRead(notification.id);
        }
    }

    dismissNotification(notification: NotificationItem): void {
        this.notificationService.dismissNotification(notification.id);
    }

    markAllAsRead(): void {
        this.notificationService.markAllAsRead();
    }

    clearAllRead(): void {
        this.notificationService.clearReadNotifications();
    }

    clearAll(): void {
        this.notificationService.clearNotifications();
    }

    executeAction(notification: NotificationItem): void {
        if (notification.actionCallback) {
            notification.actionCallback();
        }
    }

    getNotificationIcon(type: string): string {
        switch (type) {
            case 'error': return 'error';
            case 'warning': return 'warning';
            case 'info': return 'info';
            case 'success': return 'check_circle';
            default: return 'notifications';
        }
    }

    getRelativeTime(timestamp: Date): string {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return timestamp.toLocaleDateString();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        const notificationPanel = target.closest('.notification-panel');
        const notificationBell = target.closest('.notification-bell');

        // Close panel if clicking outside and not on the bell
        if (this.isOpen && !notificationPanel && !notificationBell) {
            this.closePanel();
        }
    }
}
