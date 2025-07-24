import { Injectable, signal } from '@angular/core';

export interface ErrorItem {
    id: number;
    message: string;
    source?: string;
    errorType?: 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
    errors = signal<ErrorItem[]>([]);
    private nextId = 1;

    addMessage(message: string, errorType: 'error' | 'warning' | 'info' = 'error', source?: string) {
        this.errors.update((errors: ErrorItem[]) => [...errors, { id: this.nextId++, message, source, errorType }]);
    }

    addError(message: string, source?: string) {
        this.addMessage(message, 'error', source);
    }

    addWarning(message: string, source?: string) {
        this.addMessage(message, 'warning', source);
    }

    addInfo(message: string, source?: string) {
        this.addMessage(message, 'info', source);
    }

    dismissError(id: number) {
        this.errors.update((errors: ErrorItem[]) => errors.filter((e: ErrorItem) => e.id !== id));
    }

    clearErrors() {
        this.errors.set([]);
    }
}
