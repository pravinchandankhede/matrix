import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';
import { ErrorService } from '../../../services/error.service';
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
        private errorService: ErrorService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.collectionForm = this.createForm();
    }

    public loadItem(id: string): void {
        this.isLoading = true;
        this.collectionService.getDataSourceCollection(id).subscribe({
            next: (collection: DataSourceCollection) => {
                this.item = collection;
                this.populateForm(collection);
                this.isLoading = false;
            },
            error: (err: any) => {
                this.handleError(err, 'Load collection');
                if (err.status === 404) {
                    this.errorService.addError('Collection not found.', 'Collection Detail');
                } else {
                    this.errorService.addError('Failed to load collection details.', 'Collection Detail');
                }
                this.isLoading = false;
            }
        });
    }

    public createNewItem(): DataSourceCollection {
        return {
            dataSourceCollectionUId: this.generateId(),
            name: '',
            description: '',
            dataSources: [],
            isCustom: false,
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
    }

    public saveItem(): void {
        if (!this.item) return;

        // Basic validation
        if (!this.collectionForm.valid) {
            this.errorService.addError('Please fix the form errors before saving.', 'Collection Detail');
            return;
        }

        const formValue = this.collectionForm.value;
        const collectionToSave: DataSourceCollection = {
            ...this.item,
            ...formValue,
            modifiedBy: 'System',
            modifiedDate: new Date()
        };

        if (this.isNew) {
            // Create new collection
            this.isLoading = true;
            this.collectionService.createDataSourceCollection(collectionToSave).subscribe({
                next: (createdCollection: DataSourceCollection) => {
                    this.item = createdCollection;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;
                    this.errorService.addError(
                        `Collection "${createdCollection.name}" created successfully.`,
                        'Collection Detail'
                    );
                    this.router.navigate(['/collections', createdCollection.dataSourceCollectionUId], {
                        queryParams: { edit: 'false' }
                    });
                },
                error: (err: any) => {
                    this.handleError(err, 'Create collection');
                    this.errorService.addError('Failed to create collection.', 'Collection Detail');
                    this.isLoading = false;
                }
            });
        } else {
            // Update existing collection
            this.isLoading = true;
            this.collectionService.updateDataSourceCollection(collectionToSave).subscribe({
                next: (updatedCollection: DataSourceCollection) => {
                    this.item = updatedCollection;
                    this.editMode = false;
                    this.isLoading = false;
                    this.populateForm(updatedCollection);
                    this.errorService.addError(
                        `Collection "${updatedCollection.name}" updated successfully.`,
                        'Collection Detail'
                    );
                },
                error: (err: any) => {
                    this.handleError(err, 'Update collection');
                    this.errorService.addError('Failed to update collection.', 'Collection Detail');
                    this.isLoading = false;
                }
            });
        }
    }

    public deleteItem(): void {
        if (!this.item || this.isNew || !this.item.dataSourceCollectionUId) return;

        this.isLoading = true;
        this.collectionService.deleteDataSourceCollection(this.item.dataSourceCollectionUId).subscribe({
            next: () => {
                this.errorService.addError(
                    `Collection "${this.item!.name}" deleted successfully.`,
                    'Collection Detail'
                );
                this.router.navigate(['/collections']);
            },
            error: (err: any) => {
                this.handleError(err, 'Delete collection');
                this.errorService.addError('Failed to delete collection.', 'Collection Detail');
                this.isLoading = false;
            }
        });
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
