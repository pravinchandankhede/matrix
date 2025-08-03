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

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private dataSourceService: DataSourceService
    ) {
        super();
    }

    fetchItems(): void {
        // TODO: Replace with actual service call when DataSourceService is available
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

        // For now, using empty array until service is implemented
        //this.items = [];
        //this.applyFilter();
    }

    filterPredicate(ds: DataSource): boolean {
        const matchesName = ds.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesActive = this.selectedActive
            ? ds.isActive.toString() === this.selectedActive
            : true;
        return matchesName && matchesActive;
    }

    override onFilterChange(value: string): void {
        this.selectedActive = value;
        this.applyFilter();
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

    onViewDetails(id: string): void {
        this.router.navigate(['/datasources', id]);
    }

    get filteredDataSources(): DataSource[] {
        return this.filteredItems;
    }
}
