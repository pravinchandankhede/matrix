import { Component, signal } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-error-panel',
    standalone: false,
    templateUrl: './error-panel.component.html',
    styleUrls: ['./error-panel.component.css']
})
export class ErrorPanelComponent {
    errors;
    isVisible = signal(true);
    isMinimized = signal(true);

    // Drag state
    dragging = false;
    dragOffsetX = 0;
    dragOffsetY = 0;
    panelLeft: number | null = null;
    panelTop: number | null = null;

    constructor(public errorService: ErrorService) {
        this.errors = this.errorService.errors;
    }

    // Drag handlers
    onDragStart(event: MouseEvent) {
        this.dragging = true;
        const panel = (event.target as HTMLElement).closest('.error-panel') as HTMLElement;
        const rect = panel.getBoundingClientRect();
        this.dragOffsetX = event.clientX - rect.left;
        this.dragOffsetY = event.clientY - rect.top;
        document.body.style.userSelect = 'none';
    }

    onDrag(event: MouseEvent) {
        if (!this.dragging) return;
        this.panelLeft = event.clientX - this.dragOffsetX;
        this.panelTop = event.clientY - this.dragOffsetY;
        const panel = document.querySelector('.error-panel') as HTMLElement;
        if (panel) {
            panel.style.left = `${this.panelLeft}px`;
            panel.style.top = `${this.panelTop}px`;
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
            panel.classList.add('dragging');
        }
    }

    onDragEnd() {
        this.dragging = false;
        document.body.style.userSelect = '';
        const panel = document.querySelector('.error-panel') as HTMLElement;
        if (panel) {
            panel.classList.remove('dragging');
        }
    }

    dismissError(id: number) {
        this.errorService.dismissError(id);
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
