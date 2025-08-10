import { OnDestroy, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Directive()
export abstract class BaseComponent<T = any> implements OnDestroy {
    protected destroy$ = new Subject<void>();
    protected notificationService = inject(NotificationService);
    protected router = inject(Router);
    
    isLoading: boolean = false;

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // Abstract methods that all components must implement
    protected abstract getEntityName(): string; // e.g., "Agent", "Model", "Data Source"
    protected abstract getErrorContext(): string; // e.g., "Agent List", "Model Detail"

    // Common error handling methods with comprehensive HTTP status handling
    protected handleLoadError(error: any): void {
        this.isLoading = false;
        let message = `Failed to load ${this.getEntityName().toLowerCase()}s.`;
        
        if (error) {
            if (error.status === 0 || error.status === 502 || error.status === 503 || error.status === 504) {
                message = `Cannot connect to ${this.getEntityName().toLowerCase()} service. Please check your network or server.`;
            } else if (error.status === 403) {
                message = `You do not have permission to access ${this.getEntityName().toLowerCase()}s.`;
            } else if (error.status === 404) {
                message = `${this.getEntityName()} not found.`;
            } else if (error.status >= 500) {
                message = `Server error occurred while loading ${this.getEntityName().toLowerCase()}s.`;
            } else if (error.error && typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }
        }
        
        console.error(`${this.getEntityName()} loading error:`, error);
        this.notificationService.addError(message, this.getErrorContext());
    }

    protected handleCreateError(error: any): void {
        this.isLoading = false;
        let message = `Failed to create ${this.getEntityName().toLowerCase()}.`;
        
        if (error) {
            if (error.status === 400) {
                message = `Invalid ${this.getEntityName().toLowerCase()} data. Please check your inputs.`;
            } else if (error.status === 403) {
                message = `You do not have permission to create ${this.getEntityName().toLowerCase()}s.`;
            } else if (error.status === 409) {
                message = `A ${this.getEntityName().toLowerCase()} with this name already exists.`;
            } else if (error.status >= 500) {
                message = `Server error occurred while creating ${this.getEntityName().toLowerCase()}.`;
            } else if (error.error && typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }
        }
        
        console.error(`${this.getEntityName()} create error:`, error);
        this.notificationService.addError(message, this.getErrorContext());
    }

    protected handleUpdateError(error: any): void {
        this.isLoading = false;
        let message = `Failed to update ${this.getEntityName().toLowerCase()}.`;
        
        if (error) {
            if (error.status === 404) {
                message = `${this.getEntityName()} not found.`;
            } else if (error.status === 403) {
                message = `You do not have permission to update this ${this.getEntityName().toLowerCase()}.`;
            } else if (error.status === 400) {
                message = `Invalid ${this.getEntityName().toLowerCase()} data. Please check your inputs.`;
            } else if (error.status === 409) {
                message = `${this.getEntityName()} has been modified by another user. Please refresh and try again.`;
            } else if (error.status >= 500) {
                message = `Server error occurred while updating ${this.getEntityName().toLowerCase()}.`;
            } else if (error.error && typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }
        }
        
        console.error(`${this.getEntityName()} update error:`, error);
        this.notificationService.addError(message, this.getErrorContext());
    }

    protected handleDeleteError(error: any): void {
        this.isLoading = false;
        let message = `Failed to delete ${this.getEntityName().toLowerCase()}.`;
        
        if (error) {
            if (error.status === 404) {
                message = `${this.getEntityName()} not found or already deleted.`;
            } else if (error.status === 403) {
                message = `You do not have permission to delete this ${this.getEntityName().toLowerCase()}.`;
            } else if (error.status === 409) {
                message = `Cannot delete ${this.getEntityName().toLowerCase()}. It may be in use by other resources.`;
            } else if (error.status >= 500) {
                message = `Server error occurred while deleting ${this.getEntityName().toLowerCase()}.`;
            } else if (error.error && typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }
        }
        
        console.error(`${this.getEntityName()} delete error:`, error);
        this.notificationService.addError(message, this.getErrorContext());
    }

    // Common success handling methods
    protected handleLoadSuccess(data: T[], context?: string): void {
        this.isLoading = false;
        
        if (Array.isArray(data) && data.length === 0) {
            this.notificationService.addInfo(`No ${this.getEntityName().toLowerCase()}s found.`, this.getErrorContext());
        }
    }

    protected handleCreateSuccess(itemName: string): void {
        this.isLoading = false;
        this.notificationService.addSuccess(`${this.getEntityName()} "${itemName}" created successfully.`, this.getErrorContext());
    }

    protected handleUpdateSuccess(itemName: string): void {
        this.isLoading = false;
        this.notificationService.addSuccess(`${this.getEntityName()} "${itemName}" updated successfully.`, this.getErrorContext());
    }

    protected handleDeleteSuccess(itemName: string): void {
        this.isLoading = false;
        this.notificationService.addSuccess(`${this.getEntityName()} "${itemName}" deleted successfully.`, this.getErrorContext());
    }

    // Common utility methods
    protected generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    protected handleError(error: any, operation: string): void {
        console.error(`${operation} failed:`, error);
    }

    // Common confirmation dialog
    protected confirmDelete(itemName: string): boolean {
        return confirm(`Are you sure you want to delete ${this.getEntityName().toLowerCase()} "${itemName}"?`);
    }
}
