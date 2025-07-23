import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';

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

    constructor(private agentListService: AgentService) { }

    ngOnInit() {
        this.agentListService.getAgents().subscribe(data => {
            this.agents = data;
            this.onSearch();
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
