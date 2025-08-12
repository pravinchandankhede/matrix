import { Component, inject } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { DataSourceService } from '../../../services/data-source.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-data-source-list',
    standalone: false,
    templateUrl: './data-source-list.component.html',
    styleUrls: ['./data-source-list.component.css']
})
export class DataSourceListComponent extends BaseListComponent<DataSource> {
    selectedActive: string = '';
    selectedType: string = '';

    private dataSourceService = inject(DataSourceService);

    protected getEntityName(): string {
        return 'Data Source';
    }

    protected getErrorContext(): string {
        return 'Data Source List';
    }

    protected getDetailRoute(): string {
        return '/datasources';
    }

    protected getItemId(dataSource: DataSource): string {
        return dataSource.dataSourceUId;
    }

    protected getItemName(dataSource: DataSource): string {
        return dataSource.name || 'Unknown Data Source';
    }

    protected fetchItems(): void {
        this.dataSourceService.getDataSources()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: DataSource[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(dataSource: DataSource): boolean {
        const matchesName = dataSource.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (dataSource.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
        const matchesActive = this.selectedActive ? dataSource.isActive.toString() === this.selectedActive : true;
        const matchesType = this.selectedType ? dataSource.type === this.selectedType : true;
        return matchesName && matchesActive && matchesType;
    }

    onActiveFilterChange(active: string): void {
        this.selectedActive = active;
        this.applyFilter();
    }

    onTypeFilterChange(type: string): void {
        this.selectedType = type;
        this.applyFilter();
    }

    get filteredDataSources(): DataSource[] {
        return this.filteredItems;
    }

    get uniqueTypes(): string[] {
        return [...new Set(this.items.map(ds => ds.type))].filter(Boolean);
    }

    onAdd(): void {
        this.navigateToAdd();
    }

    onEdit(dataSource: DataSource): void {
        this.navigateToEdit(dataSource.dataSourceUId, this.getItemName(dataSource));
    }

    onView(dataSource: DataSource): void {
        this.navigateToDetail(dataSource.dataSourceUId, this.getItemName(dataSource));
    }

    onSelect(dataSource: DataSource): void {
        this.navigateToDetail(dataSource.dataSourceUId, this.getItemName(dataSource));
    }

    onDelete(dataSource: DataSource): void {
        this.handleDelete(dataSource, () => {
            this.dataSourceService.deleteDataSource(dataSource.dataSourceUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(dataSource.name);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }
}
