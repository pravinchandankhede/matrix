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

  constructor(private agentListService: AgentService) {}

  ngOnInit() {
    this.agentListService.getAgents().subscribe(data => this.agents = data);
  }
}
