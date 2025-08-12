import { OnInit, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './base.component';

@Directive()
export abstract class BaseListComponent<T> extends BaseComponent<T> implements OnInit {
    items: T[] = [];
    filteredItems: T[] = [];
    searchTerm: string = '';
    filterValue: any = null;

    // Abstract methods that must be implemented by derived classes
    protected abstract fetchItems(): void;
    protected abstract filterPredicate(item: T): boolean;
    protected abstract getDetailRoute(): string; // Base route for navigation (e.g., '/agents')
    protected abstract getItemId(item: T): string; // Primary key field for tracking

    ngOnInit(): void {
        this.loadItems();
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

    // Override base success handler for list-specific behavior
    protected override handleLoadSuccess(data: T[]): void {
        this.isLoading = false;
        this.items = data;
        this.applyFilter();

        if (this.items.length === 0) {
            this.notificationService.addInfo(`No ${this.getEntityName().toLowerCase()}s found.`, this.getErrorContext());
        }
    }

    // Common delete confirmation and handling
    protected handleDelete(item: any, deleteServiceCall: () => void): void {
        const itemName = this.getEntityName().toLowerCase();
        if (this.confirmDelete(itemName)) {
            deleteServiceCall();
        }
    }

    // Override base delete success handler for list-specific behavior
    protected override handleDeleteSuccess(itemName: string): void {
        super.handleDeleteSuccess(itemName);
        this.loadItems(); // Refresh the list
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

    // Track function for ngFor performance optimization
    trackByFn = (index: number, item: T): any => {
        if (!item) return index;
        return this.getItemId(item);
    }
}
