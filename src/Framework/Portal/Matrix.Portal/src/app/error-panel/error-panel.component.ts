import { Component, signal } from '@angular/core';

interface ErrorItem {
    id: number;
    message: string;
    source?: string;
}

@Component({
    selector: 'app-error-panel',
    standalone: false,
    templateUrl: './error-panel.component.html',
    styleUrls: ['./error-panel.component.css']
})
export class ErrorPanelComponent {
    errors = signal<ErrorItem[]>([]);
    isVisible = signal(true);
    isMinimized = signal(false);
    private nextId = 1;

    addError(message: string, source?: string) {
        this.errors.update(errors => [...errors, { id: this.nextId++, message, source }]);
        this.isVisible.set(true);
        this.isMinimized.set(false);
    }

    dismissError(id: number) {
        this.errors.update(errors => errors.filter(e => e.id !== id));
        if (this.errors().length === 0) {
            this.isVisible.set(false);
        }
    }

    closePanel() {
        this.isVisible.set(false);
    }

    showPanel() {
        this.isVisible.set(true);
        this.isMinimized.set(false);
    }

    minimizePanel() {
        this.isMinimized.set(true);
    }

    restorePanel() {
        this.isMinimized.set(false);
    }
}

