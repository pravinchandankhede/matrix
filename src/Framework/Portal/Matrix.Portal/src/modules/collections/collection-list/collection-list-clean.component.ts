import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { ErrorService } from '../../../services/error.service';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';

@Component({
    selector: 'app-collection-list',
    standalone: false,
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent extends BaseListComponent<DataSourceCollection> {
    selectedCustom: string = '';

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private collectionService: DataSourceCollectionService
    ) {
        super();
    }

    fetchItems(): void {
        this.collectionService.getDataSourceCollections().subscribe({
            next: (data: DataSourceCollection[]) => {
                this.items = data;
                this.applyFilter();
                if (this.items.length === 0) {
                    this.errorService.addError('No collections found.', 'Collection List');
                }
            },
            error: (err: any) => {
                let message = 'Failed to load collections.';
                if ([0, 502, 503, 504].includes(err.status)) {
                    message = 'Cannot connect to collection service. Please check your network or server.';
                } else if (err.error && typeof err.error === 'string') {
                    message = err.error;
                } else if (err.message) {
                    message = err.message;
                }
                console.error('Collection list loading error:', err);
                this.errorService.addError(message, 'Collection List');
            }
        });
    }

    filterPredicate(collection: DataSourceCollection): boolean {
        const matchesName = collection.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           collection.description.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCustom = this.selectedCustom ? 
            (this.selectedCustom === 'true' ? collection.isCustom : !collection.isCustom) : true;
        return matchesName && matchesCustom;
    }

    onCustomFilterChange(custom: string): void {
        this.selectedCustom = custom;
        this.applyFilter();
    }

    get filteredCollections(): DataSourceCollection[] {
        return this.filteredItems;
    }

    onAdd(): void {
        this.router.navigate(['/collections/add']);
    }

    onEdit(collection: DataSourceCollection): void {
        this.router.navigate(['/collections', collection.dataSourceCollectionUId], { queryParams: { edit: 'true' } });
    }

    onView(collection: DataSourceCollection): void {
        this.router.navigate(['/collections', collection.dataSourceCollectionUId], { queryParams: { edit: 'false' } });
    }

    onSelect(collection: DataSourceCollection): void {
        this.router.navigate(['/collections', collection.dataSourceCollectionUId]);
    }

    onDelete(collection: DataSourceCollection): void {
        if (confirm(`Are you sure you want to delete collection "${collection.name}"?`)) {
            // Simulate delete for now
            this.errorService.addError(`Collection "${collection.name}" deleted successfully.`, 'Collection List');
            this.fetchItems();
        }
    }

    trackByFn(index: number, item: DataSourceCollection): string {
        return item.dataSourceCollectionUId;
    }
}
