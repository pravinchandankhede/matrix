import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chunk } from '../../../datamodels/chunk.model';
import { ChunkService } from '../../../services/chunk.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-chunk-detail',
    standalone: false,
    templateUrl: './chunk-detail.component.html',
    styleUrls: ['./chunk-detail.component.css']
})
export class ChunkDetailComponent extends BaseDetailComponent<Chunk> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    chunkForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private chunkService: ChunkService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.chunkForm = this.createForm();
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
    getItemService(): ChunkService {
        return this.chunkService;
    }

    getItemName(item: Chunk): string {
        return item.chunkId || 'Unknown Chunk';
    }

    getItemListRoute(): string {
        return '/chunks';
    }

    getEntityName(): string {
        return 'Chunk';
    }

    getErrorContext(): string {
        return 'Chunk Detail';
    }

    getItemId(item: Chunk): string {
        return item.chunkUId;
    }

    createNewItem(): Chunk {
        const newChunk = {
            chunkUId: this.generateId(),
            chunkId: '',
            text: '',
            type: 'Text',
            chunkSource: '',
            chunkSourceId: '',
            correlationUId: this.generateId(),
            chunkStrategy: {
                strategyType: 'FixedSize',
                parameters: { chunkSize: 1000, overlap: 100 }
            },
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            rowVersion: undefined,
            metadata: []
        };

        // Populate form with default values
        setTimeout(() => {
            this.populateForm();
        });

        return newChunk;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.chunkForm);

        // Check reactive form validation
        if (!this.chunkForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.chunkForm);
            errors.push(...validationErrors);
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.chunkForm.value;

        // Update basic properties from form
        this.item.chunkId = formValue.chunkId?.trim() || '';
        this.item.text = formValue.text?.trim() || '';
        this.item.type = formValue.type || 'Text';
        this.item.chunkSource = formValue.chunkSource?.trim() || '';
        this.item.chunkSourceId = formValue.chunkSourceId?.trim() || '';

        // Update chunk strategy
        this.item.chunkStrategy = {
            strategyType: formValue.strategyType || 'FixedSize',
            parameters: {
                chunkSize: formValue.chunkSize || 1000,
                overlap: formValue.overlap || 100
            }
        };

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(item: Chunk): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    private createForm(): FormGroup {
        return this.fb.group({
            chunkId: ['', [Validators.required, Validators.maxLength(50)]],
            text: ['', [Validators.required, Validators.maxLength(5000)]],
            type: ['', [Validators.required, Validators.maxLength(50)]],
            chunkSource: ['', [Validators.required, Validators.maxLength(100)]],
            chunkSourceId: ['', [Validators.required, Validators.maxLength(100)]],
            strategyType: ['', Validators.required],
            chunkSize: [1000, [Validators.min(100), Validators.max(10000)]],
            overlap: [100, [Validators.min(0), Validators.max(1000)]]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.chunkForm.patchValue({
                chunkId: this.item.chunkId || '',
                text: this.item.text || '',
                type: this.item.type || 'Text',
                chunkSource: this.item.chunkSource || '',
                chunkSourceId: this.item.chunkSourceId || '',
                strategyType: this.item.chunkStrategy?.strategyType || 'FixedSize',
                chunkSize: this.item.chunkStrategy?.parameters?.['chunkSize'] || 1000,
                overlap: this.item.chunkStrategy?.parameters?.['overlap'] || 100
            });
        }
    }

    get isFormValid(): boolean {
        return this.chunkForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.chunkUId;
    }

    setActiveSection(section: string): void {
        this.activeSection = section;
    }

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
                if (control.errors?.['min']) {
                    errors.push(`${this.getFieldDisplayName(key)} is too small`);
                }
                if (control.errors?.['max']) {
                    errors.push(`${this.getFieldDisplayName(key)} is too large`);
                }
            }
        });
        return errors;
    }

    private getFieldDisplayName(fieldName: string): string {
        const fieldNames: { [key: string]: string } = {
            'chunkId': 'Chunk ID',
            'text': 'Text',
            'type': 'Type',
            'chunkSource': 'Chunk Source',
            'chunkSourceId': 'Chunk Source ID',
            'strategyType': 'Strategy Type',
            'chunkSize': 'Chunk Size',
            'overlap': 'Overlap'
        };
        return fieldNames[fieldName] || fieldName;
    }
}
