import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../datamodels/agent.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AgentService {
    private apiUrl = 'https://localhost:7179/agents'; // Update with your actual API endpoint

    constructor(private http: HttpClient) { }

    getAgents(): Observable<Agent[]> {
        return this.http.get<Agent[]>(this.apiUrl);
    }

    getAgent(id: string): Observable<Agent> {
        return this.http.get<Agent>(`${this.apiUrl}/${id}`);
    }

    createAgent(agent: Agent): Observable<Agent> {
        return this.http.post<Agent>(this.apiUrl, agent);
    }

    updateAgent(agent: Agent): Observable<Agent> {
        return this.http.put<Agent>(`${this.apiUrl}/${agent.agentUId}`, agent);
    }

    deleteAgent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
