import { Injectable, signal } from '@angular/core';

export interface ErrorItem {
    id: number;
    message: string;
    source?: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
    errors = signal<ErrorItem[]>([]);
    private nextId = 1;

    addError(message: string, source?: string) {
        this.errors.update(errors => [...errors, { id: this.nextId++, message, source }]);
    }

    dismissError(id: number) {
        this.errors.update(errors => errors.filter(e => e.id !== id));
    }

    clearErrors() {
        this.errors.set([]);
    }
}
