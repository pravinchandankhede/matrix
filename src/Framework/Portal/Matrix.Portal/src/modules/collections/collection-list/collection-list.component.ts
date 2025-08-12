import { Component, inject } from '@angular/core';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-collection-list',
    standalone: false,
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent extends BaseListComponent<DataSourceCollection> {
    selectedCustom: string = '';

    private collectionService = inject(DataSourceCollectionService);

    protected getEntityName(): string {
        return 'Collection';
    }

    protected getErrorContext(): string {
        return 'Collection List';
    }

    protected getDetailRoute(): string {
        return '/collections';
    }

    protected getItemId(collection: DataSourceCollection): string {
        return collection.dataSourceCollectionUId;
    }

    protected getItemName(collection: DataSourceCollection): string {
        return collection.name || 'Unknown Collection';
    }

    protected fetchItems(): void {
        this.collectionService.getDataSourceCollections()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: DataSourceCollection[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(collection: DataSourceCollection): boolean {
        const matchesName = collection.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            collection.description.toLowerCase().includes(this.searchTerm.toLowerCase());
        return matchesName;
    }

    onCustomFilterChange(custom: string): void {
        this.selectedCustom = custom;
        this.applyFilter();
    }

    get filteredCollections(): DataSourceCollection[] {
        return this.filteredItems;
    }

    onAdd(): void {
        this.navigateToAdd();
    }

    onEdit(collection: DataSourceCollection): void {
        this.navigateToEdit(collection.dataSourceCollectionUId, this.getItemName(collection));
    }

    onView(collection: DataSourceCollection): void {
        this.navigateToDetail(collection.dataSourceCollectionUId, this.getItemName(collection));
    }

    onSelect(collection: DataSourceCollection): void {
        this.navigateToDetail(collection.dataSourceCollectionUId, this.getItemName(collection));
    }

    onDelete(collection: DataSourceCollection): void {
        this.handleDelete(collection, () => {
            this.collectionService.deleteDataSourceCollection(collection.dataSourceCollectionUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(collection.name);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }

    // Utility method for tracking data sources within collections
    trackDataSourceFn(index: number, item: any): string {
        return item.dataSourceUId || item.name || index.toString();
    }

    // Helper method for displaying data source previews
    getDataSourcePreview(dataSources: any[]): string {
        const first = dataSources[0]?.name || '';
        if (dataSources.length === 1) {
            return first;
        } else if (dataSources.length === 2) {
            return `${first}, ${dataSources[1]?.name || ''}`;
        } else if (dataSources.length > 2) {
            return `${first}, ${dataSources[1]?.name || ''}, +${dataSources.length - 2} more`;
        }
        return '';
    }
}
