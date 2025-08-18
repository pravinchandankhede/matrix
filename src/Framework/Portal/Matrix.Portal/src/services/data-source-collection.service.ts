import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSourceCollection, DataSource } from '../datamodels';

@Injectable({
    providedIn: 'root'
})
export class DataSourceCollectionService {
    private apiUrl = 'https://localhost:7179/DataSourceCollections';

    constructor(private http: HttpClient) { }

    getDataSourceCollections(): Observable<DataSourceCollection[]> {
        return this.http.get<DataSourceCollection[]>(this.apiUrl);
    }

    getDataSourceCollection(id: string): Observable<DataSourceCollection> {
        return this.http.get<DataSourceCollection>(`${this.apiUrl}/${id}`);
    }

    createDataSourceCollection(dataSourceCollection: DataSourceCollection): Observable<DataSourceCollection> {
        return this.http.post<DataSourceCollection>(this.apiUrl, dataSourceCollection);
    }

    updateDataSourceCollection(dataSourceCollection: DataSourceCollection): Observable<DataSourceCollection> {
        return this.http.put<DataSourceCollection>(`${this.apiUrl}/${dataSourceCollection.dataSourceCollectionUId}`, dataSourceCollection);
    }

    deleteDataSourceCollection(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Enhanced collection operations
    addDataSourceToCollection(collectionId: string, dataSourceId: string): Observable<DataSourceCollection> {
        return this.http.post<DataSourceCollection>(`${this.apiUrl}/${collectionId}/datasources`, { dataSourceId });
    }

    removeDataSourceFromCollection(collectionId: string, dataSourceId: string): Observable<DataSourceCollection> {
        return this.http.delete<DataSourceCollection>(`${this.apiUrl}/${collectionId}/datasources/${dataSourceId}`);
    }

    getCollectionDataSources(collectionId: string): Observable<DataSource[]> {
        return this.http.get<DataSource[]>(`${this.apiUrl}/${collectionId}/datasources`);
    }

    getCustomCollections(): Observable<DataSourceCollection[]> {
        return this.http.get<DataSourceCollection[]>(`${this.apiUrl}/custom`);
    }

    cloneCollection(collectionId: string, newName: string): Observable<DataSourceCollection> {
        return this.http.post<DataSourceCollection>(`${this.apiUrl}/${collectionId}/clone`, { name: newName });
    }

    validateCollection(collectionId: string): Observable<{ valid: boolean; issues: string[] }> {
        return this.http.post<{ valid: boolean; issues: string[] }>(`${this.apiUrl}/${collectionId}/validate`, {});
    }
}
