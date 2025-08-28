import { Component, inject } from '@angular/core';
import { Knowledge } from '../../../datamodels';
import { KnowledgeService } from '../../../services/knowledge.service';
import { BaseListComponent } from '../../../shared/base-list.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-knowledge-list',
    standalone: false,
    templateUrl: './knowledge-list.component.html',
    styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent extends BaseListComponent<Knowledge> {
    selectedStatus: string = '';
    selectedType: string = '';

    private knowledgeService = inject(KnowledgeService);

    protected getEntityName(): string {
        return 'Knowledge';
    }

    protected getErrorContext(): string {
        return 'Knowledge List';
    }

    protected getDetailRoute(): string {
        return '/knowledge';
    }

    protected getItemId(item: Knowledge): string {
        return item.knowledgeUId;
    }

    protected getItemName(item: Knowledge): string {
        return item.name || 'Unknown Knowledge';
    }

    protected fetchItems(): void {
        this.knowledgeService.getKnowledgeItems()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: Knowledge[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(knowledge: Knowledge): boolean {
        const matchesName = knowledge.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            knowledge.description.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesStatus = this.selectedStatus ? knowledge.status === this.selectedStatus : true;
        const matchesType = this.selectedType ? knowledge.type === this.selectedType : true;
        return matchesName && matchesStatus && matchesType;
    }

    onStatusFilterChange(status: string): void {
        this.selectedStatus = status;
        this.applyFilter();
    }

    onTypeFilterChange(type: string): void {
        this.selectedType = type;
        this.applyFilter();
    }

    get filteredKnowledge(): Knowledge[] {
        return this.filteredItems;
    }

    get uniqueStatuses(): string[] {
        return [...new Set(this.items.map(knowledge => knowledge.status))].filter(Boolean);
    }

    get uniqueTypes(): string[] {
        return [...new Set(this.items.map(knowledge => knowledge.type))].filter(Boolean);
    }

    onAdd(): void {
        this.navigateToAdd();
    }

    onEdit(knowledge: Knowledge): void {
        this.navigateToEdit(knowledge.knowledgeUId, this.getItemName(knowledge));
    }

    onView(knowledge: Knowledge): void {
        this.navigateToDetail(knowledge.knowledgeUId, this.getItemName(knowledge));
    }

    onSelect(knowledge: Knowledge): void {
        this.navigateToDetail(knowledge.knowledgeUId, this.getItemName(knowledge));
    }

    onDelete(knowledge: Knowledge): void {
        this.handleDelete(knowledge, () => {
            this.knowledgeService.deleteKnowledge(knowledge.knowledgeUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(knowledge.name);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }
}
