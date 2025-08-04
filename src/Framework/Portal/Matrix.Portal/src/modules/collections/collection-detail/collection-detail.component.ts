import { Component, Input, signal, OnInit } from '@angular/core';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';

@Component({
    selector: 'app-collection-detail',
    standalone: false,
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {
    @Input() collection: DataSourceCollection | null = null;
    editMode = signal(false); // Start in view mode
    selectedDataSourceId: string | null = null;
    tagsString = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private collectionService: DataSourceCollectionService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const editParam = this.route.snapshot.queryParamMap.get('edit');
        if (!id) {
            // No id param, treat as new collection
            this.editMode.set(true);
            this.initializeNewCollection();
        } else {
            // id is present (should be a GUID or 'add')
            this.editMode.set(editParam === 'true');
            this.loadCollection(id);
        }
    }

    private loadCollection(id: string) {
        // TODO: Replace with actual service call
        this.collectionService.getDataSourceCollection(id).subscribe({
            next: (collection: DataSourceCollection) => {
                this.collection = collection;
                // Initialize string representation for form
                this.tagsString = this.collection.tags ? this.collection.tags.join(', ') : '';
            },
            error: (err: any) => {
                // Handle error
            }
        });
    }

    private initializeNewCollection() {
        this.collection = {
            dataSourceCollectionUId: '',
            id: '',
            name: '',
            description: '',
            createdBy: '',
            createdAt: new Date().toISOString(),
            updatedBy: '',
            updatedAt: new Date().toISOString(),
            isActive: true,
            version: '',
            metadata: {},
            tags: [],
            isCustom: false,
            owner: '',
            dataSources: []
        };

        // Initialize string representation for form
        this.tagsString = '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.collection) {
            // Convert tags string back to array
            this.collection.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

            // Update audit fields
            this.collection.updatedAt = new Date().toISOString();
            // updatedBy should be set based on current user context

            this.collectionService.createDataSourceCollection(this.collection).subscribe({
                next: (result: any) => {
                    alert('Collection saved successfully!');
                    this.router.navigate(['/collections']);
                },
                error: (err: any) => {
                    alert('Failed to save collection.');
                }
            });
        }
    }

    onCancel() {
        this.router.navigate(['/collections']);
    }

    hasDataSources(): boolean {
        return !!(this.collection && this.collection.dataSources.length > 0);
    }

    onDataSourcesClick() {
        console.log('Data Sources clicked - editMode:', this.editMode(), 'hasDataSources:', this.hasDataSources());
        if (!this.editMode() && this.hasDataSources()) {
            console.log('Navigate to data sources');
            this.goToDataSources();
        }
    }

    onDataSourceSelected(dataSourceId: string) {
        this.selectedDataSourceId = dataSourceId;
        // Navigate to data source detail
        this.router.navigate(['datasources', dataSourceId]);
    }

    goToDataSources() {
        if (this.collection) {
            this.router.navigate(['datasources', 'list'], { queryParams: { collectionId: this.collection.dataSourceCollectionUId } });
        }
    }
}
