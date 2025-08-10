import { Component, inject } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { BaseListComponent } from '../../../shared/base-list.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-agent-list',
    standalone: false,
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent extends BaseListComponent<Agent> {
    selectedStatus: string = '';
    selectedType: string = '';

    private agentService = inject(AgentService);

    protected getEntityName(): string {
        return 'Agent';
    }

    protected getErrorContext(): string {
        return 'Agent List';
    }

    protected getDetailRoute(): string {
        return '/agents';
    }

    protected getItemId(agent: Agent): string {
        return agent.agentUId;
    }

    protected fetchItems(): void {
        this.agentService.getAgents()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: Agent[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(agent: Agent): boolean {
        const matchesName = agent.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            agent.description.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesStatus = this.selectedStatus ? agent.status === this.selectedStatus : true;
        const matchesType = this.selectedType ? agent.type === this.selectedType : true;
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

    get filteredAgents(): Agent[] {
        return this.filteredItems;
    }

    get uniqueStatuses(): string[] {
        return [...new Set(this.items.map(agent => agent.status))].filter(Boolean);
    }

    get uniqueTypes(): string[] {
        return [...new Set(this.items.map(agent => agent.type))].filter(Boolean);
    }

    onAdd(): void {
        this.navigateToAdd();
    }

    onEdit(agent: Agent): void {
        this.navigateToEdit(agent.agentUId);
    }

    onView(agent: Agent): void {
        this.navigateToDetail(agent.agentUId);
    }

    onSelect(agent: Agent): void {
        this.navigateToDetail(agent.agentUId);
    }

    onDelete(agent: Agent): void {
        this.handleDelete(agent, () => {
            this.agentService.deleteAgent(agent.agentUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(agent.name);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }
}
