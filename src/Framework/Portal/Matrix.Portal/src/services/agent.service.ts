import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent, AgentRequest, AgentResponse } from '../datamodels';
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

    // New methods for agent interaction
    sendQuery(agentId: string, request: AgentRequest): Observable<AgentResponse> {
        return this.http.post<AgentResponse>(`${this.apiUrl}/${agentId}/query`, request);
    }

    getAgentCapabilities(agentId: string): Observable<Agent['capabilities']> {
        return this.http.get<Agent['capabilities']>(`${this.apiUrl}/${agentId}/capabilities`);
    }

    getAgentFeatures(agentId: string): Observable<Agent['features']> {
        return this.http.get<Agent['features']>(`${this.apiUrl}/${agentId}/features`);
    }

    getAgentTools(agentId: string): Observable<Agent['tools']> {
        return this.http.get<Agent['tools']>(`${this.apiUrl}/${agentId}/tools`);
    }
}
