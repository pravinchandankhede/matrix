import { Component } from '@angular/core';
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
export class ChunkDetailComponent extends BaseDetailComponent<Chunk> {
    chunkForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private chunkService: ChunkService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(route, router);
        this.chunkForm = this.createForm();
    }

    public loadItem(id: string): void {
        this.chunkService.getChunk(id).subscribe({
            next: (chunk) => {
                this.item = chunk;
                this.populateForm(chunk);
            },
            error: (error) => console.error('Error loading chunk:', error)
        });
    }

    public createNewItem(): Chunk {
        return {
            chunkUId: '',
            chunkId: '',
            text: '',
            type: 'Text',
            chunkSource: '',
            chunkSourceId: '',
            correlationUId: '',
            chunkStrategy: {
                strategyType: 'FixedSize',
                parameters: { chunkSize: 1000, overlap: 100 }
            }
        };
    }

    public saveItem(): void {
        if (this.chunkForm.valid) {
            const formValue = this.chunkForm.value;
            const chunkToSave: Chunk = {
                ...this.item,
                ...formValue
            };

            const saveOperation = this.item?.chunkUId
                ? this.chunkService.updateChunk(chunkToSave)
                : this.chunkService.createChunk(chunkToSave);

            saveOperation.subscribe({
                next: (savedChunk) => {
                    this.item = savedChunk;
                    console.log('Chunk saved successfully');
                    this.router.navigate(['/chunks']);
                },
                error: (error) => console.error('Error saving chunk:', error)
            });
        }
    }

    public deleteItem(): void {
        if (this.item?.chunkUId && confirm('Are you sure you want to delete this chunk?')) {
            this.chunkService.deleteChunk(this.item.chunkUId).subscribe({
                next: () => {
                    console.log('Chunk deleted successfully');
                    this.router.navigate(['/chunks']);
                },
                error: (error) => console.error('Error deleting chunk:', error)
            });
        }
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
}
