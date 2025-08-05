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

    // Navigation for two-pane layout
    activeSection: string = 'general';

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
                    DataSourceUId: id,
                    Id: id,
                    Name: `Sample Data Source ${id}`,
                    Type: 'Structured',
                    SubType: 'Database',
                    Description: `This is a sample data source with ID ${id}. In a real application, this data would be fetched from a backend service.`,
                    Tags: ['production', 'database', 'mysql'],
                    Owner: 'System Administrator',
                    CreatedBy: 'System Administrator',
                    CreatedAt: new Date('2024-01-15').toISOString(),
                    UpdatedBy: 'System Administrator',
                    UpdatedAt: new Date().toISOString(),
                    IsActive: true,
                    IsCustom: false,
                    Version: '1.0',
                    Metadata: {},
                    AccessMode: 'ReadWrite',
                    AuthenticationType: 'APIKey',
                    ConnectionDetails: {
                        Host: 'localhost',
                        Port: 3306,
                        DatabaseName: 'sample_db',
                        ssl: true
                    }
                };
                this.initializeFormStrings();
            }
        });
    }

    private initializeNewDataSource() {
        this.dataSource = {
            DataSourceUId: '',
            Id: '',
            Name: '',
            Type: 'Structured',
            SubType: '',
            Description: '',
            Tags: [],
            Owner: '',
            CreatedBy: '',
            CreatedAt: new Date().toISOString(),
            UpdatedBy: '',
            UpdatedAt: new Date().toISOString(),
            IsActive: true,
            IsCustom: true,
            Version: '1.0',
            Metadata: {},
            AccessMode: 'ReadWrite',
            AuthenticationType: 'APIKey',
            ConnectionDetails: {}
        };
        this.initializeFormStrings();
    }

    private initializeFormStrings() {
        if (this.dataSource) {
            this.tagsString = this.dataSource.Tags ? this.dataSource.Tags.join(', ') : '';
        }
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.dataSource) {
            // Convert tags string back to array
            this.dataSource.Tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

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
        return this.dataSource?.Type === 'Structured' || this.dataSource?.Type === 'Vector';
    }

    onTypeClick() {
        console.log('Type clicked - editMode:', this.editMode(), 'hasConnectionDetails:', this.hasConnectionDetails());
        // Navigate to connection details page or open dialog
        if (!this.editMode() && this.hasConnectionDetails()) {
            console.log('Navigate to connection details');
            // Add navigation logic here if needed
        }
    }

    setActiveSection(section: string): void {
        this.activeSection = section;
    }
}
