import { Component, Input, signal, OnInit } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';
import { DataSourceService } from '../../../services/data-source.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-data-source-detail',
    standalone: false,
    templateUrl: './data-source-detail.component.html',
    styleUrls: ['./data-source-detail.component.css']
})
export class DataSourceDetailComponent implements OnInit {
    @Input() dataSource: DataSource | null = null;
    editMode = signal(false); // Start in view mode

    // Form helper properties
    tagsString = '';

    constructor(
        private dataSourceService: DataSourceService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        if (id && id !== 'add') {
            // Viewing existing data source - start in view mode
            this.editMode.set(false);
            this.loadDataSource(id);
        } else if (id === 'add') {
            // Adding new data source
            this.editMode.set(true);
            this.initializeNewDataSource();
        } else if (!this.dataSource) {
            // Fallback for when used as component with no data
            this.initializeNewDataSource();
        }
    }

    private loadDataSource(id: string) {
        // Try to get from service first, fallback to mock data
        this.dataSourceService.getDataSource(id).subscribe({
            next: (dataSource: DataSource) => {
                this.dataSource = dataSource;
                this.initializeFormStrings();
            },
            error: (err: any) => {
                // Create mock data if service fails
                this.dataSource = {
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
                this.initializeFormStrings();
            }
        });
    }

    private initializeNewDataSource() {
        this.dataSource = {
            dataSourceUId: '',
            name: '',
            type: 'Structured',
            subType: '',
            description: '',
            tags: [],
            owner: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            accessMode: 'ReadWrite',
            authenticationType: 'APIKey',
            connectionDetails: {}
        };
        this.initializeFormStrings();
    }

    private initializeFormStrings() {
        if (this.dataSource) {
            this.tagsString = this.dataSource.tags ? this.dataSource.tags.join(', ') : '';
        }
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.dataSource) {
            // Convert tags string back to array
            this.dataSource.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

            this.dataSourceService.createDataSource(this.dataSource).subscribe({
                next: (result: any) => {
                    alert('Data source saved successfully!');
                    this.router.navigate(['/datasources']);
                },
                error: (err: any) => {
                    alert('Failed to save data source.');
                }
            });
        }
    }

    onCancel() {
        this.router.navigate(['/datasources']);
    }

    hasConnectionDetails(): boolean {
        return this.dataSource?.type === 'Structured' || this.dataSource?.type === 'Vector';
    }

    onTypeClick() {
        console.log('Type clicked - editMode:', this.editMode(), 'hasConnectionDetails:', this.hasConnectionDetails());
        // Navigate to connection details page or open dialog
        if (!this.editMode() && this.hasConnectionDetails()) {
            console.log('Navigate to connection details');
            // Add navigation logic here if needed
        }
    }
}
