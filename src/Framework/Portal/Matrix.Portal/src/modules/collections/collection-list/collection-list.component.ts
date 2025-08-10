import { Component } from '@angular/core';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';

@Component({
    selector: 'app-collection-list',
    standalone: false,
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent extends BaseListComponent<DataSourceCollection> {
    selectedCustom: string = '';

    constructor(private collectionService: DataSourceCollectionService) {
        super();
    }

    getEntityName(): string {
        return 'Collection';
    }

    getListContext(): string {
        return 'Collection List';
    }

    getDetailRoute(): string {
        return '/collections';
    }

    fetchItems(): void {
        this.collectionService.getDataSourceCollections().subscribe({
            next: (data: DataSourceCollection[]) => {
                this.handleLoadSuccess(data);
            },
            error: (err: any) => {
                this.handleLoadError(err);
            }
        });
    }

    filterPredicate(collection: DataSourceCollection): boolean {
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
        this.navigateToEdit(collection.dataSourceCollectionUId);
    }

    onView(collection: DataSourceCollection): void {
        this.navigateToDetail(collection.dataSourceCollectionUId);
    }

    onSelect(collection: DataSourceCollection): void {
        this.navigateToDetail(collection.dataSourceCollectionUId);
    }

    onDelete(collection: DataSourceCollection): void {
        this.handleDelete(collection, () => {
            // TODO: Replace with actual service call when available
            this.handleDeleteSuccess(collection.name);
        });
    }

    trackByFn(index: number, item: DataSourceCollection): string {
        return item.dataSourceCollectionUId;
    }

    trackDataSourceFn(index: number, item: any): string {
        return item.dataSourceUId || item.name || index.toString();
    }

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
