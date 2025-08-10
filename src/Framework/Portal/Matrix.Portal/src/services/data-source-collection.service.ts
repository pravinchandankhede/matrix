import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSourceCollection } from '../datamodels/data-source-collection.model';

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
}
