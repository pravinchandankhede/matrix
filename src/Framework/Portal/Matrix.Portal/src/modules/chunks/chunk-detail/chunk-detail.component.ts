import { Component, Input, signal, OnInit } from '@angular/core';
import { Chunk } from '../../../datamodels/chunk.model';
import { ChunkService } from '../../../services/chunk.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chunk-detail',
    standalone: false,
    templateUrl: './chunk-detail.component.html',
    styleUrls: ['./chunk-detail.component.css']
})
export class ChunkDetailComponent implements OnInit {
    @Input() chunk: Chunk | null = null;
    editMode = signal(true); // Start in edit mode for add screen
    tagsString = '';

    constructor(private chunkService: ChunkService, private router: Router) { }

    ngOnInit() {
        if (!this.chunk) {
            this.chunk = {
                chunkId: '',
                id: '',
                name: '',
                description: '',
                text: '',
                type: '',
                chunkSource: '',
                chunkSourceId: '',
                correlationUId: '',
                createdBy: '',
                createdAt: new Date().toISOString(),
                updatedBy: '',
                updatedAt: new Date().toISOString(),
                isActive: true,
                version: '',
                metadata: {},
                tags: []
            };
        }

        // Initialize string representation for form
        this.tagsString = this.chunk.tags ? this.chunk.tags.join(', ') : '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.chunk) {
            // Convert tags string back to array
            this.chunk.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

            // Update audit fields
            this.chunk.updatedAt = new Date().toISOString();
            // updatedBy should be set based on current user context

            this.chunkService.addChunk(this.chunk).subscribe({
                next: (result: any) => {
                    alert('Chunk saved successfully!');
                    this.router.navigate(['/chunks']);
                },
                error: (err: any) => {
                    alert('Failed to save chunk.');
                }
            });
        }
    }
}
