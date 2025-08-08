import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-collection-detail',
    standalone: false,
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent extends BaseDetailComponent<DataSourceCollection> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    collectionForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private collectionService: DataSourceCollectionService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.collectionForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        // Populate form for new items after view init
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
            }
        });
    }

    // Base class implementations
    getItemService(): DataSourceCollectionService {
        return this.collectionService;
    }

    getItemName(item: DataSourceCollection): string {
        return item.name || 'Unknown Collection';
    }

    getItemListRoute(): string {
        return '/collections';
    }

    getEntityName(): string {
        return 'Collection';
    }

    getErrorContext(): string {
        return 'Collection Detail';
    }

    getItemId(item: DataSourceCollection): string {
        return item.dataSourceCollectionUId;
    }

    createNewItem(): DataSourceCollection {
        const newCollection = {
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

        // Populate form with default values
        setTimeout(() => {
            this.populateForm();
        });

        return newCollection;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.collectionForm);

        // Check reactive form validation
        if (!this.collectionForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.collectionForm);
            errors.push(...validationErrors);
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.collectionForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.isCustom = formValue.isCustom !== undefined ? formValue.isCustom : false;

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(item: DataSourceCollection): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    // Override base class methods to handle specific service naming
    protected override getLoadItemObservable(id: string): Observable<DataSourceCollection | null> {
        return this.collectionService.getDataSourceCollection(id);
    }

    protected override getCreateItemObservable(): Observable<DataSourceCollection | null> {
        return this.collectionService.createDataSourceCollection(this.item!);
    }

    protected override getUpdateItemObservable(): Observable<DataSourceCollection | null> {
        return this.collectionService.updateDataSourceCollection(this.item!);
    }

    protected override getDeleteItemObservable(): Observable<any> {
        const id = this.getItemId(this.item!);
        return this.collectionService.deleteDataSourceCollection(id);
    }

    // Form management methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', Validators.maxLength(500)],
            isCustom: [false]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.collectionForm.patchValue({
                name: this.item.name || '',
                description: this.item.description || '',
                isCustom: this.item.isCustom !== undefined ? this.item.isCustom : false
            });
        }
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
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

    // Utility methods
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();
        });
    }

    private getFormValidationErrors(formGroup: FormGroup): string[] {
        const errors: string[] = [];
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            if (control && control.invalid && control.touched) {
                if (control.errors?.['required']) {
                    errors.push(`${this.getFieldDisplayName(key)} is required`);
                }
                if (control.errors?.['maxlength']) {
                    errors.push(`${this.getFieldDisplayName(key)} is too long`);
                }
            }
        });
        return errors;
    }

    private getFieldDisplayName(fieldName: string): string {
        const fieldNames: { [key: string]: string } = {
            'name': 'Name',
            'description': 'Description'
        };
        return fieldNames[fieldName] || fieldName;
    }
}
