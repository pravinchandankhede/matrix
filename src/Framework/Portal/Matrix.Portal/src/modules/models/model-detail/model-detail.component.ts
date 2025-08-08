import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../../datamodels/model';
import { ModelService } from '../../../services/model.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-model-detail',
    standalone: false,
    templateUrl: './model-detail.component.html',
    styleUrls: ['./model-detail.component.css']
})
export class ModelDetailComponent extends BaseDetailComponent<Model> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    modelForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modelService: ModelService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.modelForm = this.createForm();
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
    getItemService(): ModelService {
        return this.modelService;
    }

    getItemName(item: Model): string {
        return item.name || 'Unknown Model';
    }

    getItemListRoute(): string {
        return '/models';
    }

    getEntityName(): string {
        return 'Model';
    }

    getErrorContext(): string {
        return 'Model Detail';
    }

    getItemId(item: Model): string {
        return item.modelUId;
    }

    createNewItem(): Model {
        const newModel = {
            modelUId: this.generateId(),
            name: '',
            type: '',
            version: '',
            description: '',
            provider: '',
            endpoint: '',
            apiKey: '',
            region: '',
            isEnabled: true,
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

        return newModel;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.modelForm);

        // Check reactive form validation
        if (!this.modelForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.modelForm);
            errors.push(...validationErrors);
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.modelForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.type = formValue.type?.trim() || '';
        this.item.version = formValue.version?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.provider = formValue.provider?.trim() || '';
        this.item.endpoint = formValue.endpoint?.trim() || '';
        this.item.apiKey = formValue.apiKey?.trim() || '';
        this.item.region = formValue.region?.trim() || '';
        this.item.isEnabled = formValue.isEnabled || true;

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(item: Model): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    // Form management methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['', Validators.maxLength(50)],
            version: ['', Validators.maxLength(20)],
            description: ['', Validators.maxLength(500)],
            provider: ['', Validators.maxLength(100)],
            endpoint: ['', Validators.maxLength(500)],
            apiKey: ['', Validators.maxLength(200)],
            region: ['', Validators.maxLength(50)],
            isEnabled: [true]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.modelForm.patchValue({
                name: this.item.name || '',
                type: this.item.type || '',
                version: this.item.version || '',
                description: this.item.description || '',
                provider: this.item.provider || '',
                endpoint: this.item.endpoint || '',
                apiKey: this.item.apiKey || '',
                region: this.item.region || '',
                isEnabled: this.item.isEnabled !== undefined ? this.item.isEnabled : true
            });
        }
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    get isFormValid(): boolean {
        return this.modelForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.modelUId;
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
            'version': 'Version',
            'description': 'Description',
            'provider': 'Provider',
            'endpoint': 'Endpoint',
            'apiKey': 'API Key',
            'region': 'Region'
        };
        return fieldNames[fieldName] || fieldName;
    }
}
