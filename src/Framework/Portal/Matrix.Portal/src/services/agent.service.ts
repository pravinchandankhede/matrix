import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agent } from '../datamodels/agent.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AgentService {
    private apiUrl = 'https://localhost:7179/agents'; // Update with your actual API endpoint

    constructor(private http: HttpClient) { }

    getAgents(): Observable<Agent[]> {
        // For now, return mock data until API is available
        return of(this.getMockAgents());
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

    private getMockAgents(): Agent[] {
        return [
            {
                agentUId: 'agent-001',
                name: 'ChatBot Assistant',
                description: 'A conversational AI agent for customer support',
                type: 'Chatbot',
                capabilities: [
                    {
                        capabilityUId: 'cap-001',
                        name: 'Natural Language Processing',
                        description: 'Ability to understand and process natural language',
                        type: 'AI',
                        createdBy: 'System',
                        createdDate: new Date(),
                        modifiedBy: 'System',
                        modifiedDate: new Date(),
                        correlationUId: 'corr-001',
                        rowVersion: new Uint8Array(),
                        metadata: []
                    }
                ],
                status: 'Active',
                version: '1.2.0',
                features: [
                    {
                        featureUId: 'feat-001',
                        name: 'Multi-language Support',
                        description: 'Support for multiple languages',
                        type: 'Language',
                        configuration: { languages: ['en', 'es', 'fr'] },
                        createdBy: 'System',
                        createdDate: new Date(),
                        modifiedBy: 'System',
                        modifiedDate: new Date(),
                        correlationUId: 'corr-002',
                        rowVersion: new Uint8Array(),
                        metadata: []
                    }
                ],
                tools: [
                    {
                        toolUId: 'tool-001',
                        name: 'Knowledge Base Search',
                        description: 'Tool for searching knowledge base',
                        type: 'Search',
                        configuration: { index: 'kb-main' },
                        createdBy: 'System',
                        createdDate: new Date(),
                        modifiedBy: 'System',
                        modifiedDate: new Date(),
                        correlationUId: 'corr-003',
                        rowVersion: new Uint8Array(),
                        metadata: []
                    }
                ],
                createdBy: 'Admin',
                createdDate: new Date('2024-01-15'),
                modifiedBy: 'Admin',
                modifiedDate: new Date('2024-08-01'),
                correlationUId: 'agent-corr-001',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                agentUId: 'agent-002',
                name: 'Data Processing Agent',
                description: 'Automated data processing and transformation agent',
                type: 'Data Processor',
                capabilities: [
                    {
                        capabilityUId: 'cap-002',
                        name: 'Data Transformation',
                        description: 'Transform data between different formats',
                        type: 'Data',
                        createdBy: 'System',
                        createdDate: new Date(),
                        modifiedBy: 'System',
                        modifiedDate: new Date(),
                        correlationUId: 'corr-004',
                        rowVersion: new Uint8Array(),
                        metadata: []
                    }
                ],
                status: 'Maintenance',
                version: '2.1.0',
                features: [],
                tools: [],
                createdBy: 'DataTeam',
                createdDate: new Date('2024-02-20'),
                modifiedBy: 'DataTeam',
                modifiedDate: new Date('2024-07-15'),
                correlationUId: 'agent-corr-002',
                rowVersion: new Uint8Array(),
                metadata: []
            }
        ];
    }
}
