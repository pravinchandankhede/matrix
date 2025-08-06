import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Model } from '../datamodels/model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private apiUrl = 'https://localhost:7179/models';

    constructor(private http: HttpClient) { }

    getModels(): Observable<Model[]> {
        // For now, return mock data until API is available
        return of(this.getMockModels());
    }

    getModel(id: string): Observable<Model> {
        return this.http.get<Model>(`${this.apiUrl}/${id}`);
    }

    createModel(model: Model): Observable<Model> {
        return this.http.post<Model>(this.apiUrl, model);
    }

    updateModel(model: Model): Observable<Model> {
        return this.http.put<Model>(`${this.apiUrl}/${model.modelUId}`, model);
    }

    deleteModel(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    private getMockModels(): Model[] {
        return [
            {
                modelUId: 'model-001',
                name: 'GPT-4 Turbo',
                description: 'Advanced language model for text generation and analysis',
                type: 'Language Model',
                version: '4.0.1',
                provider: 'OpenAI',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                apiKey: 'sk-***',
                region: 'us-east-1',
                isEnabled: true,
                createdBy: 'Admin',
                createdDate: new Date('2024-01-15'),
                modifiedBy: 'Admin',
                modifiedDate: new Date('2024-08-01'),
                correlationUId: 'model-corr-001',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                modelUId: 'model-002',
                name: 'Claude 3 Sonnet',
                description: 'Anthropic\'s constitutional AI model for safe and helpful responses',
                type: 'Language Model',
                version: '3.0',
                provider: 'Anthropic',
                endpoint: 'https://api.anthropic.com/v1/messages',
                apiKey: 'sk-ant-***',
                region: 'us-west-2',
                isEnabled: false,
                createdBy: 'DataTeam',
                createdDate: new Date('2024-03-10'),
                modifiedBy: 'DataTeam',
                modifiedDate: new Date('2024-07-20'),
                correlationUId: 'model-corr-002',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                modelUId: 'model-003',
                name: 'Embedding Model v3',
                description: 'Text embedding model for vector representations',
                type: 'Embedding Model',
                version: '3.2.1',
                provider: 'OpenAI',
                endpoint: 'https://api.openai.com/v1/embeddings',
                apiKey: 'sk-***',
                region: 'us-east-1',
                isEnabled: true,
                createdBy: 'System',
                createdDate: new Date('2024-02-01'),
                modifiedBy: 'System',
                modifiedDate: new Date('2024-06-15'),
                correlationUId: 'model-corr-003',
                rowVersion: new Uint8Array(),
                metadata: []
            }
        ];
    }
}
