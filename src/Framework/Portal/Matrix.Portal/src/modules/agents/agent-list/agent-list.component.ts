import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentListService } from '../../../services/agent-list.service';

@Component({
  selector: 'app-agent-list',
  standalone: false,
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];

  constructor(private agentListService: AgentListService) {}

  ngOnInit() {
    this.agentListService.getAgents().subscribe(data => this.agents = data);
  }
}
