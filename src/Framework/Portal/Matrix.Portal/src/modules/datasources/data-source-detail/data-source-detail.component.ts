import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '../../../datamodels/data-source.model';
import { DataSourceService } from '../../../services/data-source.service';
import { ErrorService } from '../../../services/error.service';
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
        private errorService: ErrorService,
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
                this.populateForm(this.item);
                this.updateTagsString();
            }
        });
    }

    public loadItem(id: string): void {
        this.isLoading = true;
        this.dataSourceService.getDataSource(id).subscribe({
            next: (dataSource: DataSource) => {
                this.item = dataSource;
                this.populateForm(dataSource);
                this.updateTagsString();
                this.isLoading = false;
            },
            error: (err: any) => {
                this.handleError(err, 'Load data source');
                if (err.status === 404) {
                    this.errorService.addError('Data source not found.', 'Data Source Detail');
                } else {
                    this.errorService.addError('Failed to load data source details.', 'Data Source Detail');
                }
                this.isLoading = false;
            }
        });
    }

    public createNewItem(): DataSource {
        return {
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
    }

    public saveItem(): void {
        if (!this.item) return;

        // Basic validation with specific error messages
        if (!this.dataSourceForm.valid) {
            this.markFormGroupTouched(this.dataSourceForm);
            const errors = this.getFormValidationErrors();
            this.errorService.addError(
                `Please fix the following errors: ${errors.join(', ')}`,
                'Data Source Detail'
            );
            return;
        }

        // Update metadata from tags before saving
        this.updateMetadataFromTags();

        const formValue = this.dataSourceForm.value;
        const dataSourceToSave: DataSource = {
            ...this.item,
            ...formValue,
            modifiedBy: 'System',
            modifiedDate: new Date()
        };

        if (this.isNew) {
            // Create new data source
            this.isLoading = true;
            this.dataSourceService.createDataSource(dataSourceToSave).subscribe({
                next: (createdDataSource: DataSource) => {
                    this.item = createdDataSource;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;
                    this.errorService.addError(
                        `Data source "${createdDataSource.name}" created successfully.`,
                        'Data Source Detail'
                    );
                    this.router.navigate(['/datasources', createdDataSource.dataSourceUId], {
                        queryParams: { edit: 'false' }
                    });
                },
                error: (err: any) => {
                    this.handleError(err, 'Create data source');
                    this.errorService.addError('Failed to create data source.', 'Data Source Detail');
                    this.isLoading = false;
                }
            });
        } else {
            // Update existing data source
            this.isLoading = true;
            this.dataSourceService.updateDataSource(dataSourceToSave).subscribe({
                next: (updatedDataSource: DataSource) => {
                    this.item = updatedDataSource;
                    this.editMode = false;
                    this.isLoading = false;
                    this.populateForm(updatedDataSource);
                    this.updateTagsString();
                    this.errorService.addError(
                        `Data source "${updatedDataSource.name}" updated successfully.`,
                        'Data Source Detail'
                    );
                },
                error: (err: any) => {
                    this.handleError(err, 'Update data source');
                    this.errorService.addError('Failed to update data source.', 'Data Source Detail');
                    this.isLoading = false;
                }
            });
        }
    }

    public deleteItem(): void {
        if (!this.item || this.isNew || !this.item.dataSourceUId) return;

        this.isLoading = true;
        this.dataSourceService.deleteDataSource(this.item.dataSourceUId).subscribe({
            next: () => {
                this.errorService.addError(
                    `Data source "${this.item!.name}" deleted successfully.`,
                    'Data Source Detail'
                );
                this.router.navigate(['/datasources']);
            },
            error: (err: any) => {
                this.handleError(err, 'Delete data source');
                this.errorService.addError('Failed to delete data source.', 'Data Source Detail');
                this.isLoading = false;
            }
        });
    }

    // Navigation methods for two-panel layout
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

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

    private populateForm(dataSource: DataSource): void {
        this.dataSourceForm.patchValue({
            name: dataSource.name,
            type: dataSource.type,
            subType: dataSource.subType,
            description: dataSource.description,
            owner: dataSource.owner,
            isActive: dataSource.isActive,
            accessMode: dataSource.accessMode,
            authenticationType: dataSource.authenticationType,
            isCustom: dataSource.isCustom
        });
    }

    get isFormValid(): boolean {
        return this.dataSourceForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.dataSourceUId;
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();
        });
    }

    private getFormValidationErrors(): string[] {
        const errors: string[] = [];
        Object.keys(this.dataSourceForm.controls).forEach(key => {
            const control = this.dataSourceForm.get(key);
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
