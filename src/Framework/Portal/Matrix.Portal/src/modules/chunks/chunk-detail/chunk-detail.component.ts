import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chunk } from '../../../datamodels/chunk.model';
import { ChunkService } from '../../../services/chunk.service';
import { ErrorService } from '../../../services/error.service';
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
        private errorService: ErrorService,
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
                this.populateForm(this.item);
            }
        });
    }

    public loadItem(id: string): void {
        this.isLoading = true;
        this.chunkService.getChunk(id).subscribe({
            next: (chunk: Chunk) => {
                this.item = chunk;
                this.populateForm(chunk);
                this.isLoading = false;
            },
            error: (err: any) => {
                this.handleError(err, 'Load chunk');
                if (err.status === 404) {
                    this.errorService.addError('Chunk not found.', 'Chunk Detail');
                } else {
                    this.errorService.addError('Failed to load chunk details.', 'Chunk Detail');
                }
                this.isLoading = false;
            }
        });
    }

    public createNewItem(): Chunk {
        return {
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
    }

    public saveItem(): void {
        if (!this.item) return;

        // Basic validation with specific error messages
        if (!this.chunkForm.valid) {
            this.markFormGroupTouched(this.chunkForm);
            const errors = this.getFormValidationErrors();
            this.errorService.addError(
                `Please fix the following errors: ${errors.join(', ')}`,
                'Chunk Detail'
            );
            return;
        }

        const formValue = this.chunkForm.value;
        const chunkToSave: Chunk = {
            ...this.item,
            ...formValue,
            chunkStrategy: {
                strategyType: formValue.strategyType,
                parameters: {
                    chunkSize: formValue.chunkSize,
                    overlap: formValue.overlap
                }
            },
            modifiedBy: 'System',
            modifiedDate: new Date()
        };

        if (this.isNew) {
            // Create new chunk
            this.isLoading = true;
            this.chunkService.createChunk(chunkToSave).subscribe({
                next: (createdChunk: Chunk) => {
                    this.item = createdChunk;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;
                    this.errorService.addError(
                        `Chunk "${createdChunk.chunkId}" created successfully.`,
                        'Chunk Detail'
                    );
                    this.router.navigate(['/chunks', createdChunk.chunkUId], {
                        queryParams: { edit: 'false' }
                    });
                },
                error: (err: any) => {
                    this.handleError(err, 'Create chunk');
                    this.errorService.addError('Failed to create chunk.', 'Chunk Detail');
                    this.isLoading = false;
                }
            });
        } else {
            // Update existing chunk
            this.isLoading = true;
            this.chunkService.updateChunk(chunkToSave).subscribe({
                next: (updatedChunk: Chunk) => {
                    this.item = updatedChunk;
                    this.editMode = false;
                    this.isLoading = false;
                    this.populateForm(updatedChunk);
                    this.errorService.addError(
                        `Chunk "${updatedChunk.chunkId}" updated successfully.`,
                        'Chunk Detail'
                    );
                },
                error: (err: any) => {
                    this.handleError(err, 'Update chunk');
                    this.errorService.addError('Failed to update chunk.', 'Chunk Detail');
                    this.isLoading = false;
                }
            });
        }
    }

    public deleteItem(): void {
        if (!this.item || this.isNew || !this.item.chunkUId) return;

        this.isLoading = true;
        this.chunkService.deleteChunk(this.item.chunkUId).subscribe({
            next: () => {
                this.errorService.addError(
                    `Chunk "${this.item!.chunkId}" deleted successfully.`,
                    'Chunk Detail'
                );
                this.router.navigate(['/chunks']);
            },
            error: (err: any) => {
                this.handleError(err, 'Delete chunk');
                this.errorService.addError('Failed to delete chunk.', 'Chunk Detail');
                this.isLoading = false;
            }
        });
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

    private populateForm(chunk: Chunk): void {
        this.chunkForm.patchValue({
            chunkId: chunk.chunkId,
            text: chunk.text,
            type: chunk.type,
            chunkSource: chunk.chunkSource,
            chunkSourceId: chunk.chunkSourceId,
            strategyType: chunk.chunkStrategy?.strategyType || 'FixedSize',
            chunkSize: chunk.chunkStrategy?.parameters?.['chunkSize'] || 1000,
            overlap: chunk.chunkStrategy?.parameters?.['overlap'] || 100
        });
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

    private getFormValidationErrors(): string[] {
        const errors: string[] = [];
        Object.keys(this.chunkForm.controls).forEach(key => {
            const control = this.chunkForm.get(key);
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
