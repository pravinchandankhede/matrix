import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chunk } from '../../../datamodels/chunk.model';
import { ChunkService } from '../../../services/chunk.service';
import { ErrorService } from '../../../services/error.service';
import { BaseListComponent } from '../../../shared/base-list.component';

@Component({
    selector: 'app-chunk-list',
    standalone: false,
    templateUrl: './chunk-list.component.html',
    styleUrls: ['./chunk-list.component.css']
})
export class ChunkListComponent extends BaseListComponent<Chunk> {
    selectedType: string = '';

    constructor(
        private router: Router,
        private chunkListService: ChunkService,
        private errorService: ErrorService
    ) {
        super();
    }

    fetchItems(): void {
        this.chunkListService.getChunks().subscribe({
            next: (data: Chunk[]) => {
                this.items = data;
                this.applyFilter();
                if (this.items.length === 0) {
                    this.errorService.addError('No chunks found.', 'Chunk List');
                }
            },
            error: (err: any) => {
                let message = 'Failed to load chunks.';
                if (err) {
                    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504) {
                        message = 'Cannot connect to chunk service. Please check your network or server.';
                    } else if (err.error && typeof err.error === 'string') {
                        message = err.error;
                    } else if (err.message) {
                        message = err.message;
                    }
                }
                console.error('Chunk list loading error:', err);
                this.errorService.addError(message, 'Chunk List');
            }
        });
    }

    filterPredicate(chunk: Chunk): boolean {
        const matchesText = chunk.text.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesType = this.selectedType ? chunk.type === this.selectedType : true;
        return matchesText && matchesType;
    }

    override onFilterChange(type: string): void {
        this.selectedType = type;
        this.applyFilter();
    }

    get filteredChunks(): Chunk[] {
        return this.filteredItems;
    }

    onAdd(): void {
        this.router.navigate(['/chunks/add']);
    }

    onEdit(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkId], { queryParams: { edit: 'true' } });
    }

    onView(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkId], { queryParams: { edit: 'false' } });
    }

    onSelect(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkId]);
    }
}
