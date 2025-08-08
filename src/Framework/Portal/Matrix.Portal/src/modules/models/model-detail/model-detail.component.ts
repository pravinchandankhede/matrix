import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../../datamodels/model';
import { ModelService } from '../../../services/model.service';
import { ErrorService } from '../../../services/error.service';
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
        private errorService: ErrorService,
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
                this.populateForm(this.item);
            }
        });
    }

    public loadItem(id: string): void {
        this.isLoading = true;
        this.modelService.getModel(id).subscribe({
            next: (model: Model) => {
                this.item = model;
                this.populateForm(model);
                this.isLoading = false;
            },
            error: (err: any) => {
                this.handleError(err, 'Load model');
                if (err.status === 404) {
                    this.errorService.addError('Model not found.', 'Model Detail');
                } else {
                    this.errorService.addError('Failed to load model details.', 'Model Detail');
                }
                this.isLoading = false;
            }
        });
    }

    public createNewItem(): Model {
        return {
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
    }

    public saveItem(): void {
        if (!this.item) return;

        // Basic validation with specific error messages
        if (!this.modelForm.valid) {
            this.markFormGroupTouched(this.modelForm);
            const errors = this.getFormValidationErrors();
            this.errorService.addError(
                `Please fix the following errors: ${errors.join(', ')}`,
                'Model Detail'
            );
            return;
        }

        const formValue = this.modelForm.value;
        const modelToSave: Model = {
            ...this.item,
            ...formValue,
            modifiedBy: 'System',
            modifiedDate: new Date()
        };

        if (this.isNew) {
            // Create new model
            this.isLoading = true;
            this.modelService.createModel(modelToSave).subscribe({
                next: (createdModel: Model) => {
                    this.item = createdModel;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;
                    this.errorService.addError(
                        `Model "${createdModel.name}" created successfully.`,
                        'Model Detail'
                    );
                    this.router.navigate(['/models', createdModel.modelUId], {
                        queryParams: { edit: 'false' }
                    });
                },
                error: (err: any) => {
                    this.handleError(err, 'Create model');
                    this.errorService.addError('Failed to create model.', 'Model Detail');
                    this.isLoading = false;
                }
            });
        } else {
            // Update existing model
            this.isLoading = true;
            this.modelService.updateModel(modelToSave).subscribe({
                next: (updatedModel: Model) => {
                    this.item = updatedModel;
                    this.editMode = false;
                    this.isLoading = false;
                    this.populateForm(updatedModel);
                    this.errorService.addError(
                        `Model "${updatedModel.name}" updated successfully.`,
                        'Model Detail'
                    );
                },
                error: (err: any) => {
                    this.handleError(err, 'Update model');
                    this.errorService.addError('Failed to update model.', 'Model Detail');
                    this.isLoading = false;
                }
            });
        }
    }

    public deleteItem(): void {
        if (!this.item || this.isNew || !this.item.modelUId) return;

        this.isLoading = true;
        this.modelService.deleteModel(this.item.modelUId).subscribe({
            next: () => {
                this.errorService.addError(
                    `Model "${this.item!.name}" deleted successfully.`,
                    'Model Detail'
                );
                this.router.navigate(['/models']);
            },
            error: (err: any) => {
                this.handleError(err, 'Delete model');
                this.errorService.addError('Failed to delete model.', 'Model Detail');
                this.isLoading = false;
            }
        });
    }

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

    private populateForm(model: Model): void {
        this.modelForm.patchValue({
            name: model.name,
            type: model.type,
            version: model.version,
            description: model.description,
            provider: model.provider,
            endpoint: model.endpoint,
            apiKey: model.apiKey,
            region: model.region,
            isEnabled: model.isEnabled
        });
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

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();
        });
    }

    private getFormValidationErrors(): string[] {
        const errors: string[] = [];
        Object.keys(this.modelForm.controls).forEach(key => {
            const control = this.modelForm.get(key);
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
