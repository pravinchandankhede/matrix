import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '../../../datamodels/data-source.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { ErrorService } from '../../../services/error.service';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
    selector: 'app-data-source-list',
    standalone: false,
    templateUrl: './data-source-list.component.html',
    styleUrls: ['./data-source-list.component.css']
})
export class DataSourceListComponent extends BaseListComponent<DataSource> {
    selectedActive: string = '';
    selectedType: string = '';

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private dataSourceService: DataSourceService
    ) {
        super();
    }

    fetchItems(): void {
        this.dataSourceService.getDataSources().subscribe({
            next: (data: DataSource[]) => {
                this.items = data;
                this.applyFilter();
                if (this.items.length === 0) {
                    this.errorService.addError('No data sources found.', 'Data Source List');
                }
            },
            error: (err: any) => {
                let message = 'Failed to load data sources.';
                if (err) {
                    if ([0, 502, 503, 504].includes(err.status)) {
                        message = 'Cannot connect to data source service. Please check your network or server.';
                    } else if (err.error && typeof err.error === 'string') {
                        message = err.error;
                    } else if (err.message) {
                        message = err.message;
                    }
                }
                console.error('Data source list loading error:', err);
                this.errorService.addError(message, 'Data Source List');
            }
        });
    }

    filterPredicate(dataSource: DataSource): boolean {
        const matchesName = dataSource.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (dataSource.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
        const matchesActive = this.selectedActive ? 
            (this.selectedActive === 'true' ? dataSource.isActive : !dataSource.isActive) : true;
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
        this.router.navigate(['/datasources/add']);
    }

    onEdit(dataSource: DataSource): void {
        this.router.navigate(['/datasources', dataSource.dataSourceUId], { queryParams: { edit: 'true' } });
    }

    onView(dataSource: DataSource): void {
        this.router.navigate(['/datasources', dataSource.dataSourceUId], { queryParams: { edit: 'false' } });
    }

    onSelect(dataSource: DataSource): void {
        this.router.navigate(['/datasources', dataSource.dataSourceUId]);
    }

    onDelete(dataSource: DataSource): void {
        if (confirm(`Are you sure you want to delete data source "${dataSource.name}"?`)) {
            // Simulate delete for now
            this.errorService.addError(`Data source "${dataSource.name}" deleted successfully.`, 'Data Source List');
            this.fetchItems();
        }
    }

    trackByFn(index: number, item: DataSource): string {
        return item.dataSourceUId;
    }
}
