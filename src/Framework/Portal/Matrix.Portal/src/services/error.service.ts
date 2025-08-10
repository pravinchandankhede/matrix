import { Injectable, signal } from '@angular/core';

export interface ErrorItem {
    id: number;
    message: string;
    source?: string;
    errorType: 'error' | 'warning' | 'info' | 'success';
    timestamp: Date;
    isRead: boolean;
    details?: string;
    actionLabel?: string;
    actionCallback?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
    errors = signal<ErrorItem[]>([]);
    isNotificationPanelOpen = signal(false);
    private nextId = 1;

    addMessage(
        message: string,
        errorType: 'error' | 'warning' | 'info' | 'success' = 'error',
        source?: string,
        details?: string,
        actionLabel?: string,
        actionCallback?: () => void
    ) {
        const newError: ErrorItem = {
            id: this.nextId++,
            message,
            source,
            errorType,
            timestamp: new Date(),
            isRead: false,
            details,
            actionLabel,
            actionCallback
        };

        this.errors.update((errors: ErrorItem[]) => [newError, ...errors]);
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

    dismissError(id: number) {
        this.errors.update((errors: ErrorItem[]) => errors.filter((e: ErrorItem) => e.id !== id));
    }

    markAsRead(id: number) {
        this.errors.update((errors: ErrorItem[]) =>
            errors.map(error =>
                error.id === id ? { ...error, isRead: true } : error
            )
        );
    }

    markAllAsRead() {
        this.errors.update((errors: ErrorItem[]) =>
            errors.map(error => ({ ...error, isRead: true }))
        );
    }

    clearErrors() {
        this.errors.set([]);
    }

    clearReadErrors() {
        this.errors.update((errors: ErrorItem[]) => errors.filter(error => !error.isRead));
    }

    getUnreadCount(): number {
        return this.errors().filter(error => !error.isRead).length;
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
