import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agent } from '../datamodels/agent.model';

@Injectable({ providedIn: 'root' })
export class AgentService {
  getAgents(): Observable<Agent[]> {
    return of([
      { name: 'Agent Alpha', status: 'Running', type: 'LLM', description: 'Handles customer queries.' },
      { name: 'Agent Beta', status: 'Idle', type: 'Data', description: 'Processes data streams.' },
      { name: 'Agent Gamma', status: 'Running', type: 'RAG', description: 'Retrieves knowledge base info.' }
    ]);
  }
}
