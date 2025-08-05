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

    constructor(
        private router: Router,
        private agentListService: AgentService, 
        private errorService: ErrorService
    ) {
        super();
    }

    fetchItems(): void {
        this.agentListService.getAgents().subscribe({
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
        const matchesName = agent.Name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesStatus = this.selectedStatus ? agent.Status === this.selectedStatus : true;
        return matchesName && matchesStatus;
    }

    override onFilterChange(status: string) {
        this.selectedStatus = status;
        this.applyFilter();
    }

    get filteredAgents(): Agent[] {
        return this.filteredItems;
    }

    onAdd(): void {
        this.router.navigate(['/agents/add']);
    }

    onEdit(agent: Agent): void {
        this.router.navigate(['/agents', agent.AgentUId], { queryParams: { edit: 'true' } });
    }

    onView(agent: Agent): void {
        this.router.navigate(['/agents', agent.AgentUId], { queryParams: { edit: 'false' } });
    }

    onSelect(agent: Agent): void {
        this.router.navigate(['/agents', agent.AgentUId]);
    }
}
