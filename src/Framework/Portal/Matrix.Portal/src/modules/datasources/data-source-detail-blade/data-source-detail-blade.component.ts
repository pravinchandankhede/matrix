import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, signal } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
    selector: 'app-data-source-detail-blade',
    standalone: false,
    templateUrl: './data-source-detail-blade.component.html',
    styleUrls: ['./data-source-detail-blade.component.css']
})
export class DataSourceDetailBladeComponent implements OnChanges {
    @Input() dataSourceId: string | null = null;
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();

    dataSource = signal<DataSource | null>(null);
    loading = signal(false);
    error = signal<string | null>(null);
    editMode = signal(false);
    viewModeBlade = signal(false);

    // Form helper properties
    tagsString = '';

    constructor(private dataSourceService: DataSourceService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataSourceId'] && this.dataSourceId && this.isOpen) {
            this.loadDataSource(this.dataSourceId);
        } else if (changes['isOpen'] && !this.isOpen) {
            this.resetComponent();
        }
    }

    public loadDataSource(id: string) {
        this.loading.set(true);
        this.error.set(null);
        
        this.dataSourceService.getDataSource(id).subscribe({
            next: (dataSource: DataSource) => {
                this.dataSource.set(dataSource);
                this.initializeFormStrings();
                this.loading.set(false);
            },
            error: (err: any) => {
                // Create mock data if service fails
                const mockDataSource: DataSource = {
                    dataSourceUId: id,
                    name: `Sample Data Source ${id}`,
                    type: 'Structured',
                    subType: 'Database',
                    description: `This is a sample data source with ID ${id}. In a real application, this data would be fetched from a backend service.`,
                    tags: ['production', 'database', 'mysql'],
                    owner: 'System Administrator',
                    createdAt: new Date('2024-01-15').toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true,
                    accessMode: 'ReadWrite',
                    authenticationType: 'APIKey',
                    connectionDetails: {
                        host: 'localhost',
                        port: 3306,
                        database: 'sample_db',
                        ssl: true
                    }
                };
                this.dataSource.set(mockDataSource);
                this.initializeFormStrings();
                this.loading.set(false);
            }
        });
    }

    private initializeFormStrings() {
        const ds = this.dataSource();
        if (ds) {
            this.tagsString = ds.tags ? ds.tags.join(', ') : '';
        }
    }

    private resetComponent() {
        this.dataSource.set(null);
        this.editMode.set(false);
        this.viewModeBlade.set(false);
        this.loading.set(false);
        this.error.set(null);
        this.tagsString = '';
    }

    onClose() {
        this.close.emit();
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        const ds = this.dataSource();
        if (ds) {
            // Convert tags string back to array
            ds.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

            this.dataSourceService.createDataSource(ds).subscribe({
                next: (result: any) => {
                    alert('Data source saved successfully!');
                    this.editMode.set(false);
                },
                error: (err: any) => {
                    alert('Failed to save data source.');
                }
            });
        }
    }

    onCancel() {
        this.editMode.set(false);
        // Reload the original data
        if (this.dataSourceId) {
            this.loadDataSource(this.dataSourceId);
        }
    }

    hasConnectionDetails(): boolean {
        const ds = this.dataSource();
        return ds?.type === 'Structured' || ds?.type === 'Vector';
    }

    onTypeClick() {
        if (!this.editMode() && this.hasConnectionDetails()) {
            this.viewModeBlade.set(true);
        }
    }

    onCloseViewModeBlade() {
        this.viewModeBlade.set(false);
    }
}
