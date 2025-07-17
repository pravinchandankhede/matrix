import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../datamodels/model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private apiUrl = '/api/models'; // Adjust the base URL as needed

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

    updateModel(id: string, model: Model): Observable<Model> {
        return this.http.put<Model>(`${this.apiUrl}/${id}`, model);
    }

    deleteModel(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
