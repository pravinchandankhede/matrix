import { OnInit, OnDestroy, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Directive()
export abstract class BaseListComponent<T> implements OnInit, OnDestroy {
    items: T[] = [];
    filteredItems: T[] = [];
    searchTerm: string = '';
    filterValue: any = null;
    isLoading: boolean = false;

    protected destroy$ = new Subject<void>();
    protected notificationService = inject(NotificationService);
    protected router = inject(Router);

    abstract fetchItems(): void;
    abstract filterPredicate(item: T): boolean;
    abstract getEntityName(): string; // e.g., "Agent", "Model", etc.
    abstract getListContext(): string; // e.g., "Agent List", "Model List", etc.

    ngOnInit(): void {
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadItems(): void {
        this.isLoading = true;
        this.fetchItems();
    }

    onSearch(): void {
        this.applyFilter();
    }

    onFilterChange(value: any): void {
        this.filterValue = value;
        this.applyFilter();
    }

    applyFilter(): void {
        this.filteredItems = this.items.filter(item => this.filterPredicate(item));
    }

    // Common error handling for derived classes
    protected handleLoadError(error: any): void {
        this.isLoading = false;
        let message = `Failed to load ${this.getEntityName().toLowerCase()}s.`;

        if (error) {
            if (error.status === 0 || error.status === 502 || error.status === 503 || error.status === 504) {
                message = `Cannot connect to ${this.getEntityName().toLowerCase()} service. Please check your network or server.`;
            } else if (error.error && typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }
        }

        console.error(`${this.getEntityName()} list loading error:`, error);
        this.notificationService.addError(message, this.getListContext());
    }

    // Common success handling for derived classes
    protected handleLoadSuccess(data: T[]): void {
        this.isLoading = false;
        this.items = data;
        this.applyFilter();

        if (this.items.length === 0) {
            this.notificationService.addInfo(`No ${this.getEntityName().toLowerCase()}s found.`, this.getListContext());
        }
    }

    // Common delete confirmation and handling
    protected handleDelete(item: any, deleteServiceCall: () => void): void {
        if (confirm(`Are you sure you want to delete this ${this.getEntityName().toLowerCase()}?`)) {
            deleteServiceCall();
        }
    }

    // Common delete success handling
    protected handleDeleteSuccess(itemName: string): void {
        this.notificationService.addSuccess(`${this.getEntityName()} "${itemName}" deleted successfully.`, this.getListContext());
        this.loadItems(); // Refresh the list
    }

    // Common delete error handling
    protected handleDeleteError(error: any): void {
        let message = `Failed to delete ${this.getEntityName().toLowerCase()}.`;

        if (error && error.error && typeof error.error === 'string') {
            message = error.error;
        } else if (error && error.message) {
            message = error.message;
        }

        console.error(`${this.getEntityName()} delete error:`, error);
        this.notificationService.addError(message, this.getListContext());
    }

    // Common navigation methods
    protected navigateToDetail(id: string): void {
        this.router.navigate([this.getDetailRoute(), id]);
    }

    protected navigateToAdd(): void {
        this.router.navigate([this.getDetailRoute(), 'add']);
    }

    protected navigateToEdit(id: string): void {
        this.router.navigate([this.getDetailRoute(), id], { queryParams: { edit: 'true' } });
    }

    // Abstract method for getting the detail route
    protected abstract getDetailRoute(): string;
}
