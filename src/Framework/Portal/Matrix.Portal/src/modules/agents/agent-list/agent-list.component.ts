import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { ErrorService } from '../../../services/error.service';
import { BaseListComponent } from '../../../shared/base-list.component';

@Component({
    selector: 'app-agent-list',
    standalone: false,
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent extends BaseListComponent<Agent> {
    selectedStatus: string = '';
    selectedType: string = '';

    constructor(
        private router: Router,
        private agentService: AgentService, 
        private errorService: ErrorService
    ) {
        super();
    }

    fetchItems(): void {
        this.agentService.getAgents().subscribe({
            next: (data: Agent[]) => {
                this.items = data;
                this.applyFilter();
                if (this.items.length === 0) {
                    this.errorService.addError('No agents found.', 'Agent List');
                }
            },
            error: (err: any) => {
                let message = 'Failed to load agents.';
                if (err) {
                    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504) {
                        message = 'Cannot connect to agent service. Please check your network or server.';
                    } else if (err.error && typeof err.error === 'string') {
                        message = err.error;
                    } else if (err.message) {
                        message = err.message;
                    }
                }
                console.error('Agent list loading error:', err);
                this.errorService.addError(message, 'Agent List');
            }
        });
    }

    filterPredicate(agent: Agent): boolean {
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
        this.router.navigate(['/agents/add']);
    }

    onEdit(agent: Agent): void {
        this.router.navigate(['/agents', agent.agentUId], { queryParams: { edit: 'true' } });
    }

    onView(agent: Agent): void {
        this.router.navigate(['/agents', agent.agentUId], { queryParams: { edit: 'false' } });
    }

    onSelect(agent: Agent): void {
        this.router.navigate(['/agents', agent.agentUId]);
    }

    onDelete(agent: Agent): void {
        if (confirm(`Are you sure you want to delete agent "${agent.name}"?`)) {
            this.agentService.deleteAgent(agent.agentUId).subscribe({
                next: () => {
                    this.fetchItems();
                    this.errorService.addError(`Agent "${agent.name}" deleted successfully.`, 'Agent List');
                },
                error: (err: any) => {
                    console.error('Delete agent error:', err);
                    this.errorService.addError('Failed to delete agent.', 'Agent List');
                }
            });
        }
    }

    trackByFn(index: number, item: Agent): string {
        return item.agentUId;
    }
}
