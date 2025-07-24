import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { ErrorService } from '../../../services/error.service';

@Component({
    selector: 'app-agent-list',
    standalone: false,
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
    agents: Agent[] = [];
    filteredAgents: Agent[] = [];
    searchTerm: string = '';
    selectedStatus: string = '';

    constructor(private agentListService: AgentService, private errorService: ErrorService) { }

    ngOnInit() {
        this.agentListService.getAgents().subscribe({
            next: data => {
                this.agents = data;
                this.onSearch();
                if (this.agents.length === 0) {
                    this.errorService.addError('No agents found.', 'Agent List');
                }
            },
            error: err => {
                let message = 'Failed to load agents.';
                // Enhanced network error handling
                if (err) {
                    if (err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504) {
                        message = 'Cannot connect to agent service. Please check your network or server.';
                    } else if (err.error && typeof err.error === 'string') {
                        message = err.error;
                    } else if (err.message) {
                        message = err.message;
                    }
                }
                // Optionally log the error for debugging
                console.error('Agent list loading error:', err);
                this.errorService.addError(message, 'Agent List');
                this.errorService.addError(message, 'Agent List');
                this.errorService.addError(message, 'Agent List');
                this.errorService.addError(message, 'Agent List');
                this.errorService.addError(message, 'Agent List');
            }
        });
    }

    onSearch() {
        this.filteredAgents = this.agents.filter(agent => {
            const matchesName = agent.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesStatus = this.selectedStatus ? agent.status === this.selectedStatus : true;
            return matchesName && matchesStatus;
        });
    }

    onFilterChange(status: string) {
        this.selectedStatus = status;
        this.onSearch();
    }
}
