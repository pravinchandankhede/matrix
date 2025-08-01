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
    dataSourcesBlade = signal(false); // Track if data sources blade is open
    selectedDataSourceId: string | null = null;
    dataSourceDetailBladeOpen = false;

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
            },
            error: (err: any) => {
                // Handle error
            }
        });
    }

    private initializeNewCollection() {
        this.collection = {
            dataSourceCollectionUId: '',
            name: '',
            description: '',
            createdDate: new Date().toISOString(),
            lastModifiedDate: new Date().toISOString(),
            dataSources: [],
            isCustom: false
        };
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.collection) {
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
            console.log('Opening data sources blade');
            this.dataSourcesBlade.set(true);
        }
    }

    onCloseDataSourcesBlade() {
        this.dataSourcesBlade.set(false);
    }

    onDataSourceSelected(dataSourceId: string) {
        this.selectedDataSourceId = dataSourceId;
        this.dataSourceDetailBladeOpen = true;
    }

    onCloseDataSourceDetailBlade() {
        this.dataSourceDetailBladeOpen = false;
        this.selectedDataSourceId = null;
    }

    onDataSourcesBladeSave() {
        // Handle save action from data sources blade
        this.onSave();
    }

    onDataSourcesBladeCancel() {
        // Handle cancel action from data sources blade
        this.onCancel();
    }

    goToDataSources() {
        if (this.collection) {
            this.router.navigate(['datasources', 'list'], { queryParams: { collectionId: this.collection.dataSourceCollectionUId } });
        }
    }
}
