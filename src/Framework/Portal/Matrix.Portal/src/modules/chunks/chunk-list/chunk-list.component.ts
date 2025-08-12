import { Component, inject } from '@angular/core';
import { Chunk } from '../../../datamodels/chunk.model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { ChunkService } from '../../../services/chunk.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-chunk-list',
    standalone: false,
    templateUrl: './chunk-list.component.html',
    styleUrls: ['./chunk-list.component.css']
})
export class ChunkListComponent extends BaseListComponent<Chunk> {
    selectedType: string = '';
    selectedSource: string = '';

    private chunkService = inject(ChunkService);

    protected getEntityName(): string {
        return 'Chunk';
    }

    protected getErrorContext(): string {
        return 'Chunk List';
    }

    protected getDetailRoute(): string {
        return '/chunks';
    }

    protected getItemId(chunk: Chunk): string {
        return chunk.chunkId;
    }

    protected getItemName(chunk: Chunk): string {
        return `Chunk ${chunk.chunkId.substring(0, 8)}...`;
    }

    protected fetchItems(): void {
        this.chunkService.getChunks()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: Chunk[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(chunk: Chunk): boolean {
        const matchesContent = chunk.text.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            chunk.chunkId.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesType = this.selectedType ? chunk.type === this.selectedType : true;
        const matchesSource = this.selectedSource ? chunk.chunkSource === this.selectedSource : true;
        return matchesContent && matchesType && matchesSource;
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

    truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    onAdd(): void {
        this.navigateToAdd();
    }

    onEdit(chunk: Chunk): void {
        this.navigateToEdit(chunk.chunkId, this.getItemName(chunk));
    }

    onView(chunk: Chunk): void {
        this.navigateToDetail(chunk.chunkId, this.getItemName(chunk));
    }

    onSelect(chunk: Chunk): void {
        this.navigateToDetail(chunk.chunkId, this.getItemName(chunk));
    }

    onDelete(chunk: Chunk): void {
        this.handleDelete(chunk, () => {
            this.chunkService.deleteChunk(chunk.chunkId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(chunk.chunkId);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }
}
