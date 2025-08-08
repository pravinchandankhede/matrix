import { OnInit, OnDestroy, Directive, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Directive()
export abstract class BaseDetailComponent<T> implements OnInit, OnDestroy {
    @Input() editMode: boolean = false;

    item: T | null = null;
    isLoading: boolean = false;
    isNew: boolean = false;
    itemId: string | null = null;

    protected destroy$ = new Subject<void>();
    protected errorService = inject(ErrorService);

    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            takeUntil(this.destroy$)
        ).subscribe(params => {
            this.itemId = params.get('id');
            if (this.itemId && this.itemId !== 'add') {
                this.isNew = false;
                this.loadItem(this.itemId);
            } else {
                this.isNew = true;
                this.item = this.createNewItem();
                this.editMode = true; // Auto-enter edit mode for new items
            }
        });

        this.route.queryParamMap.pipe(
            takeUntil(this.destroy$)
        ).subscribe(params => {
            // Only override editMode from query params if not creating a new item
            if (!this.isNew) {
                this.editMode = params.get('edit') === 'true';
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // Abstract methods that derived classes must implement
    abstract createNewItem(): T;
    abstract getItemService(): any; // Service that handles CRUD operations
    abstract getItemName(item: T): string; // Get display name for messages
    abstract getItemListRoute(): string; // Route to navigate back to list
    abstract validateItem(): string[]; // Custom validation logic
    abstract updateItemFromForm(): void; // Update item from form values

    // Concrete implementations that can be overridden if needed
    loadItem(id: string): void {
        this.isLoading = true;
        this.getLoadItemObservable(id).subscribe({
            next: (item: T | null) => {
                if (item) {
                    this.item = item;
                    this.onItemLoaded(item);
                    this.isLoading = false;
                    // Update browser state for breadcrumb
                    history.replaceState({ ...history.state, itemName: this.getItemName(item) }, '');
                } else {
                    // HTTP 200 but no data - treat as not found
                    this.errorService.addError(`${this.getEntityName()} not found.`, this.getErrorContext());
                    this.isLoading = false;
                    this.router.navigate([this.getItemListRoute()]);
                }
            },
            error: (err: any) => {
                this.handleError(err, `Load ${this.getEntityName().toLowerCase()}`);
                this.handleLoadError(err);
                this.isLoading = false;
                this.router.navigate([this.getItemListRoute()]);
            }
        });
    }

    saveItem(): void {
        if (!this.item) return;

        // Perform validation
        const validationErrors = this.validateItem();
        if (validationErrors.length > 0) {
            validationErrors.forEach(error => {
                this.errorService.addError(error, this.getErrorContext());
            });
            return;
        }

        // Update item from form values
        this.updateItemFromForm();

        if (this.isNew) {
            this.createItem();
        } else {
            this.updateItem();
        }
    }

    deleteItem(): void {
        if (!this.item || this.isNew) return;

        this.isLoading = true;
        this.getDeleteItemObservable().subscribe({
            next: (response: any) => {
                this.errorService.addError(
                    `${this.getEntityName()} "${this.getItemName(this.item!)}" deleted successfully.`,
                    this.getErrorContext()
                );
                this.router.navigate([this.getItemListRoute()]);
            },
            error: (err: any) => {
                this.handleError(err, `Delete ${this.getEntityName().toLowerCase()}`);
                this.handleDeleteError(err);
                this.isLoading = false;
            }
        });
    }

    // Helper methods for CRUD operations
    private createItem(): void {
        this.isLoading = true;
        this.getCreateItemObservable().subscribe({
            next: (createdItem: T | null) => {
                if (createdItem) {
                    this.item = createdItem;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;

                    this.errorService.addError(
                        `${this.getEntityName()} "${this.getItemName(createdItem)}" created successfully.`,
                        this.getErrorContext()
                    );

                    const itemId = this.getItemId(createdItem);
                    this.router.navigate([this.getItemListRoute(), itemId], {
                        queryParams: { edit: 'false' },
                        state: { itemName: this.getItemName(createdItem) }
                    });
                } else {
                    this.errorService.addError(`${this.getEntityName()} created but no data returned from server.`, this.getErrorContext());
                    this.isLoading = false;
                    this.router.navigate([this.getItemListRoute()]);
                }
            },
            error: (err: any) => {
                this.handleError(err, `Create ${this.getEntityName().toLowerCase()}`);
                this.handleCreateError(err);
                this.isLoading = false;
            }
        });
    }

    private updateItem(): void {
        this.isLoading = true;
        this.getUpdateItemObservable().subscribe({
            next: (response: T | null) => {
                if (response) {
                    this.item = response;
                }

                this.editMode = false;
                this.isLoading = false;
                this.onItemUpdated();

                const itemName = this.getItemName(this.item!);
                this.errorService.addError(
                    `${this.getEntityName()} "${itemName}" updated successfully.`,
                    this.getErrorContext()
                );

                // Update browser state for breadcrumb
                history.replaceState({ ...history.state, itemName: itemName }, '');
            },
            error: (err: any) => {
                this.handleError(err, `Update ${this.getEntityName().toLowerCase()}`);
                this.handleUpdateError(err);
                this.isLoading = false;
            }
        });
    }

    // Observable factory methods - derived classes can override if needed
    protected getLoadItemObservable(id: string): Observable<T | null> {
        const service = this.getItemService();
        if (service.getItem) {
            return service.getItem(id);
        } else if (service.get) {
            return service.get(id);
        } else {
            // Try common naming patterns
            const entityName = this.getEntityName();
            const possibleMethodNames = [
                `get${entityName}`,
                `get${entityName}s`,
                `fetch${entityName}`,
                `load${entityName}`,
                `retrieve${entityName}`
            ];

            for (const methodName of possibleMethodNames) {
                if (service[methodName]) {
                    return service[methodName](id);
                }
            }

            throw new Error(`No suitable get method found on service for ${entityName}. Available methods: ${Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => typeof service[name] === 'function').join(', ')}`);
        }
    }

    protected getCreateItemObservable(): Observable<T | null> {
        const service = this.getItemService();
        if (service.createItem) {
            return service.createItem(this.item);
        } else if (service.create) {
            return service.create(this.item);
        } else {
            // Try common naming patterns
            const entityName = this.getEntityName();
            const possibleMethodNames = [
                `create${entityName}`,
                `create${entityName}s`,
                `add${entityName}`,
                `insert${entityName}`,
                `save${entityName}`
            ];

            for (const methodName of possibleMethodNames) {
                if (service[methodName]) {
                    return service[methodName](this.item);
                }
            }

            throw new Error(`No suitable create method found on service for ${entityName}. Available methods: ${Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => typeof service[name] === 'function').join(', ')}`);
        }
    }

    protected getUpdateItemObservable(): Observable<T | null> {
        const service = this.getItemService();
        if (service.updateItem) {
            return service.updateItem(this.item);
        } else if (service.update) {
            return service.update(this.item);
        } else {
            // Try common naming patterns
            const entityName = this.getEntityName();
            const possibleMethodNames = [
                `update${entityName}`,
                `update${entityName}s`,
                `modify${entityName}`,
                `edit${entityName}`,
                `save${entityName}`
            ];

            for (const methodName of possibleMethodNames) {
                if (service[methodName]) {
                    return service[methodName](this.item);
                }
            }

            throw new Error(`No suitable update method found on service for ${entityName}. Available methods: ${Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => typeof service[name] === 'function').join(', ')}`);
        }
    }

    protected getDeleteItemObservable(): Observable<any> {
        const id = this.getItemId(this.item!);
        const service = this.getItemService();
        if (service.deleteItem) {
            return service.deleteItem(id);
        } else if (service.delete) {
            return service.delete(id);
        } else {
            // Try common naming patterns
            const entityName = this.getEntityName();
            const possibleMethodNames = [
                `delete${entityName}`,
                `delete${entityName}s`,
                `remove${entityName}`,
                `destroy${entityName}`,
                `erase${entityName}`
            ];

            for (const methodName of possibleMethodNames) {
                if (service[methodName]) {
                    return service[methodName](id);
                }
            }

            throw new Error(`No suitable delete method found on service for ${entityName}. Available methods: ${Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => typeof service[name] === 'function').join(', ')}`);
        }
    }

    // Error handling methods with comprehensive HTTP status handling
    protected handleLoadError(err: any): void {
        if (err.status === 404) {
            this.errorService.addError(`${this.getEntityName()} not found.`, this.getErrorContext());
        } else if (err.status === 403) {
            this.errorService.addError(`You do not have permission to view this ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else if (err.status >= 500) {
            this.errorService.addError(`Server error occurred while loading ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else {
            this.errorService.addError(`Failed to load ${this.getEntityName().toLowerCase()} details.`, this.getErrorContext());
        }
    }

    protected handleCreateError(err: any): void {
        if (err.status === 400) {
            this.errorService.addError(`Invalid ${this.getEntityName().toLowerCase()} data. Please check your inputs.`, this.getErrorContext());
        } else if (err.status === 403) {
            this.errorService.addError(`You do not have permission to create ${this.getEntityName().toLowerCase()}s.`, this.getErrorContext());
        } else if (err.status === 409) {
            this.errorService.addError(`A ${this.getEntityName().toLowerCase()} with this name already exists.`, this.getErrorContext());
        } else if (err.status >= 500) {
            this.errorService.addError(`Server error occurred while creating ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else {
            this.errorService.addError(`Failed to create ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        }
    }

    protected handleUpdateError(err: any): void {
        if (err.status === 404) {
            this.errorService.addError(`${this.getEntityName()} not found.`, this.getErrorContext());
        } else if (err.status === 403) {
            this.errorService.addError(`You do not have permission to update this ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else if (err.status === 400) {
            this.errorService.addError(`Invalid ${this.getEntityName().toLowerCase()} data. Please check your inputs.`, this.getErrorContext());
        } else if (err.status === 409) {
            this.errorService.addError(`${this.getEntityName()} has been modified by another user. Please refresh and try again.`, this.getErrorContext());
        } else if (err.status >= 500) {
            this.errorService.addError(`Server error occurred while updating ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else {
            this.errorService.addError(`Failed to update ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        }
    }

    protected handleDeleteError(err: any): void {
        if (err.status === 404) {
            this.errorService.addError(`${this.getEntityName()} not found or already deleted.`, this.getErrorContext());
        } else if (err.status === 403) {
            this.errorService.addError(`You do not have permission to delete this ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else if (err.status === 409) {
            this.errorService.addError(`Cannot delete ${this.getEntityName().toLowerCase()}. It may be in use by other resources.`, this.getErrorContext());
        } else if (err.status >= 500) {
            this.errorService.addError(`Server error occurred while deleting ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        } else {
            this.errorService.addError(`Failed to delete ${this.getEntityName().toLowerCase()}.`, this.getErrorContext());
        }
    }

    // Lifecycle hooks - can be overridden by derived classes
    protected onItemLoaded(item: T): void {
        // Override in derived classes if needed
    }

    protected onItemUpdated(): void {
        // Override in derived classes if needed (e.g., to repopulate forms)
    }

    // Abstract methods for entity-specific information
    protected abstract getEntityName(): string; // e.g., "Agent", "Model", "DataSource"
    protected abstract getErrorContext(): string; // e.g., "Agent Detail", "Model Detail"
    protected abstract getItemId(item: T): string; // Get the ID field from the item

    // Existing methods
    onEdit(): void {
        this.editMode = true;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { edit: 'true' },
            queryParamsHandling: 'merge'
        });
    }

    onCancelEdit(): void {
        this.editMode = false;
        if (this.isNew) {
            this.goBack();
        } else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { edit: 'false' },
                queryParamsHandling: 'merge'
            });
            if (this.itemId) {
                this.loadItem(this.itemId);
            }
        }
    }

    onSave(): void {
        this.saveItem();
    }

    onDelete(): void {
        if (confirm('Are you sure you want to delete this item?')) {
            this.deleteItem();
        }
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    protected handleError(error: any, operation: string): void {
        console.error(`${operation} failed:`, error);
    }

    protected generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
