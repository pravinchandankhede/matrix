import { Injectable, signal } from '@angular/core';

export interface NotificationItem {
    id: number;
    message: string;
    source?: string;
    notificationType: 'error' | 'warning' | 'info' | 'success';
    timestamp: Date;
    isRead: boolean;
    details?: string;
    actionLabel?: string;
    actionCallback?: () => void;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    notifications = signal<NotificationItem[]>([]);
    isNotificationPanelOpen = signal(false);
    private nextId = 1;

    addMessage(
        message: string, 
        notificationType: 'error' | 'warning' | 'info' | 'success' = 'error', 
        source?: string,
        details?: string,
        actionLabel?: string,
        actionCallback?: () => void
    ) {
        const newNotification: NotificationItem = {
            id: this.nextId++,
            message,
            source,
            notificationType,
            timestamp: new Date(),
            isRead: false,
            details,
            actionLabel,
            actionCallback
        };
        
        this.notifications.update((notifications: NotificationItem[]) => [newNotification, ...notifications]);
    }

    addError(message: string, source?: string, details?: string, actionLabel?: string, actionCallback?: () => void) {
        this.addMessage(message, 'error', source, details, actionLabel, actionCallback);
    }

    addWarning(message: string, source?: string, details?: string, actionLabel?: string, actionCallback?: () => void) {
        this.addMessage(message, 'warning', source, details, actionLabel, actionCallback);
    }

    addInfo(message: string, source?: string, details?: string, actionLabel?: string, actionCallback?: () => void) {
        this.addMessage(message, 'info', source, details, actionLabel, actionCallback);
    }

    addSuccess(message: string, source?: string, details?: string, actionLabel?: string, actionCallback?: () => void) {
        this.addMessage(message, 'success', source, details, actionLabel, actionCallback);
    }

    dismissNotification(id: number) {
        this.notifications.update((notifications: NotificationItem[]) => notifications.filter((n: NotificationItem) => n.id !== id));
    }

    markAsRead(id: number) {
        this.notifications.update((notifications: NotificationItem[]) => 
            notifications.map(notification => 
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    }

    markAllAsRead() {
        this.notifications.update((notifications: NotificationItem[]) => 
            notifications.map(notification => ({ ...notification, isRead: true }))
        );
    }

    clearNotifications() {
        this.notifications.set([]);
    }

    clearReadNotifications() {
        this.notifications.update((notifications: NotificationItem[]) => notifications.filter(notification => !notification.isRead));
    }

    getUnreadCount(): number {
        return this.notifications().filter(notification => !notification.isRead).length;
    }

    toggleNotificationPanel() {
        this.isNotificationPanelOpen.update(isOpen => !isOpen);
    }

    closeNotificationPanel() {
        this.isNotificationPanelOpen.set(false);
    }

    openNotificationPanel() {
        this.isNotificationPanelOpen.set(true);
    }
}
