import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-collection-detail',
    standalone: false,
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent extends BaseDetailComponent<DataSourceCollection> {
    // Navigation
    activeSection: string = 'general';

    collectionForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private collectionService: DataSourceCollectionService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(route, router);
        this.collectionForm = this.createForm();
    }

    public loadItem(id: string): void {
        this.collectionService.getDataSourceCollection(id).subscribe({
            next: (collection) => {
                this.item = collection;
                this.populateForm(collection);
            },
            error: (error) => console.error('Error loading collection:', error)
        });
    }

    public createNewItem(): DataSourceCollection {
        return {
            dataSourceCollectionUId: '',
            name: '',
            description: '',
            dataSources: [],
            isCustom: false,
            createdBy: 'Current User',
            createdDate: new Date(),
            modifiedBy: 'Current User',
            modifiedDate: new Date(),
            correlationUId: '',
            rowVersion: new Uint8Array(),
            metadata: []
        };
    }

    public saveItem(): void {
        if (this.collectionForm.valid) {
            const formValue = this.collectionForm.value;
            const collectionToSave: DataSourceCollection = {
                ...this.item,
                ...formValue,
                modifiedBy: 'Current User',
                modifiedDate: new Date()
            };

            const saveOperation = this.item?.dataSourceCollectionUId
                ? this.collectionService.updateDataSourceCollection(collectionToSave)
                : this.collectionService.createDataSourceCollection(collectionToSave);

            saveOperation.subscribe({
                next: (savedCollection) => {
                    this.item = savedCollection;
                    console.log('Collection saved successfully');
                    this.router.navigate(['/collections']);
                },
                error: (error) => console.error('Error saving collection:', error)
            });
        }
    }

    public deleteItem(): void {
        if (this.item?.dataSourceCollectionUId && confirm('Are you sure you want to delete this collection?')) {
            this.collectionService.deleteDataSourceCollection(this.item.dataSourceCollectionUId).subscribe({
                next: () => {
                    console.log('Collection deleted successfully');
                    this.router.navigate(['/collections']);
                },
                error: (error) => console.error('Error deleting collection:', error)
            });
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', Validators.maxLength(500)],
            isCustom: [false]
        });
    }

    private populateForm(collection: DataSourceCollection): void {
        this.collectionForm.patchValue({
            name: collection.name,
            description: collection.description,
            isCustom: collection.isCustom
        });
    }

    get isFormValid(): boolean {
        return this.collectionForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.dataSourceCollectionUId;
    }

    get dataSourceCount(): number {
        return this.item?.dataSources?.length || 0;
    }

    setActiveSection(section: string): void {
        this.activeSection = section;
    }
}
