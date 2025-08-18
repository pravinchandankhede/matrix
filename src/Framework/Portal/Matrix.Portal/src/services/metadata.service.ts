import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metadata } from '../datamodels';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    private apiUrl = 'https://localhost:7179/metadata';

    constructor(private http: HttpClient) { }

    getMetadata(): Observable<Metadata[]> {
        return this.http.get<Metadata[]>(this.apiUrl);
    }

    getMetadataItem(id: string): Observable<Metadata> {
        return this.http.get<Metadata>(`${this.apiUrl}/${id}`);
    }

    createMetadata(metadata: Metadata): Observable<Metadata> {
        return this.http.post<Metadata>(this.apiUrl, metadata);
    }

    updateMetadata(metadata: Metadata): Observable<Metadata> {
        return this.http.put<Metadata>(`${this.apiUrl}/${metadata.metadataUId}`, metadata);
    }

    deleteMetadata(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Metadata-specific operations
    getMetadataByEntity(entityId: string): Observable<Metadata[]> {
        return this.http.get<Metadata[]>(`${this.apiUrl}/entity/${entityId}`);
    }

    getMetadataByName(name: string): Observable<Metadata[]> {
        return this.http.get<Metadata[]>(`${this.apiUrl}/name/${encodeURIComponent(name)}`);
    }

    searchMetadata(query: string): Observable<Metadata[]> {
        return this.http.get<Metadata[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
    }

    bulkCreateMetadata(metadata: Metadata[]): Observable<Metadata[]> {
        return this.http.post<Metadata[]>(`${this.apiUrl}/bulk`, metadata);
    }

    bulkDeleteMetadata(ids: string[]): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/bulk`, { body: { ids } });
    }
}
