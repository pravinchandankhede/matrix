import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent {
  agents = [
    { name: 'Agent Alpha', status: 'Running', type: 'LLM', description: 'Handles customer queries.' },
    { name: 'Agent Beta', status: 'Idle', type: 'Data', description: 'Processes data streams.' },
    { name: 'Agent Gamma', status: 'Running', type: 'RAG', description: 'Retrieves knowledge base info.' }
  ];
}
