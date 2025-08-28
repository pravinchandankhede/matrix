import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Knowledge, DataSourceCollection, Model, DataSource, Chunk } from '../../../datamodels';
import { KnowledgeService } from '../../../services/knowledge.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-knowledge-detail',
    standalone: false,
    templateUrl: './knowledge-detail.component.html',
    styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent extends BaseDetailComponent<Knowledge> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    knowledgeForm: FormGroup;

    private fb = inject(FormBuilder);
    private knowledgeService = inject(KnowledgeService);

    constructor() {
        super();
        this.knowledgeForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        // Populate form fields for new items after view init
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
            }
        });
    }

    // Base class implementations
    getItemService(): KnowledgeService {
        return this.knowledgeService;
    }

    getItemName(item: Knowledge): string {
        return item.name || 'Unknown Knowledge';
    }

    getItemListRoute(): string {
        return '/knowledge';
    }

    getEntityName(): string {
        return 'Knowledge';
    }

    getErrorContext(): string {
        return 'Knowledge Detail';
    }

    getItemId(item: Knowledge): string {
        return item.knowledgeUId;
    }

    createNewItem(): Knowledge {
        const newKnowledge: Knowledge = {
            knowledgeUId: this.generateId(),
            name: '',
            description: '',
            type: '',
            dataSourceCollection: {} as DataSourceCollection,
            model: {} as Model,
            status: 'Active',
            outputDataSource: {} as DataSource,
            chunkStrategy: {} as Chunk,
            version: '1.0.0',
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: new Uint8Array(),
            metadata: []
        };

        // Populate form with default values
        setTimeout(() => {
            this.populateForm();
        });

        return newKnowledge;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.knowledgeForm);

        // Check reactive form validation
        if (!this.knowledgeForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.knowledgeForm);
            errors.push(...validationErrors);
        }

        // Additional business logic validation
        if (this.item) {
            if (!this.item.dataSourceCollection?.dataSourceCollectionUId) {
                errors.push('Data Source Collection is required.');
            }
            if (!this.item.model?.modelUId) {
                errors.push('Model is required.');
            }
            if (!this.item.outputDataSource?.dataSourceUId) {
                errors.push('Output Data Source is required.');
            }
            if (!this.item.chunkStrategy?.chunkUId) {
                errors.push('Chunk Strategy is required.');
            }
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.knowledgeForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.type = formValue.type?.trim() || '';
        this.item.status = formValue.status || 'Active';
        this.item.version = formValue.version || '1.0.0';

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(_item: Knowledge): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    // Reactive Forms Methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            description: [''],
            type: ['', [Validators.required]],
            status: ['Active', [Validators.required]],
            version: ['1.0.0', [Validators.required]]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.knowledgeForm.patchValue({
                name: this.item.name || '',
                description: this.item.description || '',
                type: this.item.type || '',
                status: this.item.status || 'Active',
                version: this.item.version || '1.0.0'
            });
        }
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    // Form validation helper methods
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private getFormValidationErrors(form: FormGroup): string[] {
        const errors: string[] = [];

        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control && !control.valid && (control.dirty || control.touched)) {
                const fieldName = this.getFieldDisplayName(key);
                if (control.errors?.['required']) {
                    errors.push(`${fieldName} is required.`);
                }
                if (control.errors?.['minlength']) {
                    const minLength = control.errors['minlength'].requiredLength;
                    errors.push(`${fieldName} must be at least ${minLength} characters long.`);
                }
                if (control.errors?.['maxlength']) {
                    const maxLength = control.errors['maxlength'].requiredLength;
                    errors.push(`${fieldName} cannot exceed ${maxLength} characters.`);
                }
                if (control.errors?.['email']) {
                    errors.push(`${fieldName} must be a valid email address.`);
                }
                if (control.errors?.['pattern']) {
                    errors.push(`${fieldName} format is invalid.`);
                }
            }
        });

        return errors;
    }

    private getFieldDisplayName(fieldName: string): string {
        const fieldNames: { [key: string]: string } = {
            'name': 'Knowledge Name',
            'description': 'Description',
            'type': 'Knowledge Type',
            'status': 'Status',
            'version': 'Version'
        };

        return fieldNames[fieldName] || fieldName;
    }
}
