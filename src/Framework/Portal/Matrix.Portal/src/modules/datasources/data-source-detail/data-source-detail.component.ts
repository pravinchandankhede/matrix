import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '../../../datamodels/data-source.model';
import { DataSourceService } from '../../../services/data-source.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';
import { DataSourceType, AccessMode, AuthenticationType } from '../../../datamodels/base.model';

@Component({
    selector: 'app-data-source-detail',
    standalone: false,
    templateUrl: './data-source-detail.component.html',
    styleUrls: ['./data-source-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataSourceDetailComponent extends BaseDetailComponent<DataSource> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    dataSourceForm: FormGroup;
    dataSourceTypes = Object.values(DataSourceType);
    accessModes = Object.values(AccessMode);
    authenticationTypes = Object.values(AuthenticationType);
    tagsString: string = '';

    constructor(
        private fb: FormBuilder,
        private dataSourceService: DataSourceService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.dataSourceForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        // Populate form for new items after view init
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
                this.updateTagsString();
            }
        });
    }

    // Base class implementations
    getItemService(): DataSourceService {
        return this.dataSourceService;
    }

    getItemName(item: DataSource): string {
        return item.name || 'Unknown Data Source';
    }

    getItemListRoute(): string {
        return '/datasources';
    }

    getEntityName(): string {
        return 'Data Source';
    }

    getErrorContext(): string {
        return 'Data Source Detail';
    }

    getItemId(item: DataSource): string {
        return item.dataSourceUId;
    }

    createNewItem(): DataSource {
        const newDataSource = {
            dataSourceUId: this.generateId(),
            name: 'New Data Source',
            type: DataSourceType.Structured,
            subType: '',
            description: '',
            owner: 'System',
            isActive: true,
            accessMode: AccessMode.ReadOnly,
            authenticationType: AuthenticationType.None,
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
            this.updateTagsString();
        });

        return newDataSource;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.dataSourceForm);

        // Update metadata from tags before validation
        this.updateMetadataFromTags();

        // Check reactive form validation
        if (!this.dataSourceForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.dataSourceForm);
            errors.push(...validationErrors);
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.dataSourceForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.type = formValue.type || DataSourceType.Structured;
        this.item.subType = formValue.subType?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.owner = formValue.owner?.trim() || '';
        this.item.isActive = formValue.isActive !== undefined ? formValue.isActive : true;
        this.item.accessMode = formValue.accessMode || AccessMode.ReadOnly;
        this.item.authenticationType = formValue.authenticationType || AuthenticationType.None;
        this.item.isCustom = formValue.isCustom !== undefined ? formValue.isCustom : false;

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(item: DataSource): void {
        this.populateForm();
        this.updateTagsString();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
        this.updateTagsString();
    }

    // Form management methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['', Validators.required],
            subType: ['', Validators.maxLength(50)],
            description: ['', Validators.maxLength(500)],
            owner: ['', [Validators.required, Validators.maxLength(100)]],
            isActive: [true],
            accessMode: ['', Validators.required],
            authenticationType: ['', Validators.required],
            isCustom: [false]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.dataSourceForm.patchValue({
                name: this.item.name || '',
                type: this.item.type || DataSourceType.Structured,
                subType: this.item.subType || '',
                description: this.item.description || '',
                owner: this.item.owner || '',
                isActive: this.item.isActive !== undefined ? this.item.isActive : true,
                accessMode: this.item.accessMode || AccessMode.ReadOnly,
                authenticationType: this.item.authenticationType || AuthenticationType.None,
                isCustom: this.item.isCustom !== undefined ? this.item.isCustom : false
            });
        }
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    get isFormValid(): boolean {
        return this.dataSourceForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.dataSourceUId;
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
            'type': 'Type',
            'subType': 'Sub Type',
            'description': 'Description',
            'owner': 'Owner',
            'accessMode': 'Access Mode',
            'authenticationType': 'Authentication Type'
        };
        return fieldNames[fieldName] || fieldName;
    }

    // DataSource-specific methods
    hasConnectionDetails(): boolean {
        return this.item?.type === 'Structured' || this.item?.type === 'Vector';
    }

    getTagsFromMetadata(): string[] {
        if (!this.item?.metadata) return [];

        // Extract tags from metadata array
        const tagsMetadata = this.item.metadata.find(m => m['key'] === 'tags');
        if (tagsMetadata && tagsMetadata['value']) {
            return tagsMetadata['value'].split(',').map((tag: string) => tag.trim());
        }
        return [];
    }

    private updateTagsString(): void {
        this.tagsString = this.getTagsFromMetadata().join(', ');
    }

    private updateMetadataFromTags(): void {
        if (!this.item) return;

        if (!this.item.metadata) {
            this.item.metadata = [];
        }

        // Remove existing tags metadata
        this.item.metadata = this.item.metadata.filter(m => m['key'] !== 'tags');

        // Add new tags metadata if tags exist
        if (this.tagsString.trim()) {
            this.item.metadata.push({
                key: 'tags',
                value: this.tagsString,
                type: 'string'
            });
        }
    }
}
