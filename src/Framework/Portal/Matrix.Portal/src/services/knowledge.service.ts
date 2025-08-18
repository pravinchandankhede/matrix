import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Knowledge, DataSourceCollection, Model, DataSource, Chunk } from '../datamodels';

@Injectable({
    providedIn: 'root'
})
export class KnowledgeService {
    private apiUrl = 'https://localhost:7179/knowledge';

    constructor(private http: HttpClient) { }

    getKnowledgeItems(): Observable<Knowledge[]> {
        return this.http.get<Knowledge[]>(this.apiUrl);
    }

    getKnowledge(id: string): Observable<Knowledge> {
        return this.http.get<Knowledge>(`${this.apiUrl}/${id}`);
    }

    createKnowledge(knowledge: Knowledge): Observable<Knowledge> {
        return this.http.post<Knowledge>(this.apiUrl, knowledge);
    }

    updateKnowledge(knowledge: Knowledge): Observable<Knowledge> {
        return this.http.put<Knowledge>(`${this.apiUrl}/${knowledge.knowledgeUId}`, knowledge);
    }

    deleteKnowledge(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Knowledge-specific operations
    getKnowledgeByType(type: string): Observable<Knowledge[]> {
        return this.http.get<Knowledge[]>(`${this.apiUrl}/type/${type}`);
    }

    getKnowledgeByStatus(status: string): Observable<Knowledge[]> {
        return this.http.get<Knowledge[]>(`${this.apiUrl}/status/${status}`);
    }

    processKnowledge(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/${id}/process`, {});
    }

    getKnowledgeProgress(id: string): Observable<{ status: string; progress: number; message: string }> {
        return this.http.get<{ status: string; progress: number; message: string }>(`${this.apiUrl}/${id}/progress`);
    }

    searchKnowledge(query: string): Observable<Knowledge[]> {
        return this.http.get<Knowledge[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
    }
}
