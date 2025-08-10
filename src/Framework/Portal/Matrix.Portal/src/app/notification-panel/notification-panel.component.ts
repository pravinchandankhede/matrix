import { Component, HostListener } from '@angular/core';
import { ErrorService, ErrorItem } from '../../services/error.service';

@Component({
    selector: 'app-notification-panel',
    standalone: false,
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent {

    constructor(public errorService: ErrorService) { }

    get isOpen(): boolean {
        return this.errorService.isNotificationPanelOpen();
    }

    get notifications(): ErrorItem[] {
        return this.errorService.errors();
    }

    get unreadCount(): number {
        return this.errorService.getUnreadCount();
    }

    closePanel(): void {
        // Add closing animation
        const panel = document.querySelector('.notification-panel');
        if (panel) {
            panel.classList.add('closing');
            setTimeout(() => {
                this.errorService.closeNotificationPanel();
            }, 200);
        } else {
            this.errorService.closeNotificationPanel();
        }
    }

    markAsRead(notification: ErrorItem): void {
        if (!notification.isRead) {
            this.errorService.markAsRead(notification.id);
        }
    }

    dismissNotification(notification: ErrorItem): void {
        this.errorService.dismissError(notification.id);
    }

    markAllAsRead(): void {
        this.errorService.markAllAsRead();
    }

    clearAllRead(): void {
        this.errorService.clearReadErrors();
    }

    clearAll(): void {
        this.errorService.clearErrors();
    }

    executeAction(notification: ErrorItem): void {
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
