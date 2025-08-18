import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../datamodels';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private apiUrl = 'https://localhost:7179/models';

    constructor(private http: HttpClient) { }

    getModels(): Observable<Model[]> {
        return this.http.get<Model[]>(this.apiUrl);
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

    // Enhanced model operations
    getModelsByProvider(provider: string): Observable<Model[]> {
        return this.http.get<Model[]>(`${this.apiUrl}/provider/${provider}`);
    }

    getModelsByType(type: string): Observable<Model[]> {
        return this.http.get<Model[]>(`${this.apiUrl}/type/${type}`);
    }

    getEnabledModels(): Observable<Model[]> {
        return this.http.get<Model[]>(`${this.apiUrl}/enabled`);
    }

    testModelConnection(modelId: string): Observable<{ success: boolean; message: string; latency?: number }> {
        return this.http.post<{ success: boolean; message: string; latency?: number }>(`${this.apiUrl}/${modelId}/test`, {});
    }

    toggleModelStatus(modelId: string, enabled: boolean): Observable<Model> {
        return this.http.patch<Model>(`${this.apiUrl}/${modelId}/status`, { isEnabled: enabled });
    }

    getModelMetrics(modelId: string): Observable<{ usage: number; errors: number; averageLatency: number }> {
        return this.http.get<{ usage: number; errors: number; averageLatency: number }>(`${this.apiUrl}/${modelId}/metrics`);
    }
}
