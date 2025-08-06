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
    selectedSource: string = '';

    constructor(
        private router: Router,
        private chunkService: ChunkService, 
        private errorService: ErrorService
    ) {
        super();
    }

    fetchItems(): void {
        this.chunkService.getChunks().subscribe({
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
        const matchesText = chunk.text.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           chunk.chunkId.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesType = this.selectedType ? chunk.type === this.selectedType : true;
        const matchesSource = this.selectedSource ? chunk.chunkSource === this.selectedSource : true;
        return matchesText && matchesType && matchesSource;
    }

    onTypeFilterChange(type: string): void {
        this.selectedType = type;
        this.applyFilter();
    }

    onSourceFilterChange(source: string): void {
        this.selectedSource = source;
        this.applyFilter();
    }

    get filteredChunks(): Chunk[] {
        return this.filteredItems;
    }

    get uniqueTypes(): string[] {
        return [...new Set(this.items.map(chunk => chunk.type))].filter(Boolean);
    }

    get uniqueSources(): string[] {
        return [...new Set(this.items.map(chunk => chunk.chunkSource))].filter(Boolean);
    }

    onAdd(): void {
        this.router.navigate(['/chunks/add']);
    }

    onEdit(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkUId], { queryParams: { edit: 'true' } });
    }

    onView(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkUId], { queryParams: { edit: 'false' } });
    }

    onSelect(chunk: Chunk): void {
        this.router.navigate(['/chunks', chunk.chunkUId]);
    }

    onDelete(chunk: Chunk): void {
        if (confirm(`Are you sure you want to delete chunk "${chunk.chunkId}"?`)) {
            // Simulate delete for now
            this.errorService.addError(`Chunk "${chunk.chunkId}" deleted successfully.`, 'Chunk List');
            this.fetchItems();
        }
    }

    trackByFn(index: number, item: Chunk): string {
        return item.chunkUId;
    }

    truncateText(text: string, maxLength: number = 100): string {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
}
