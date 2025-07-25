import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSource } from '../datamodels/data-source.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    private apiUrl = 'https://localhost:7179/DataSources';

    constructor(private http: HttpClient) { }

    getDataSources(): Observable<DataSource[]> {
        return this.http.get<DataSource[]>(this.apiUrl);
    }

    getDataSource(id: string): Observable<DataSource> {
        return this.http.get<DataSource>(`${this.apiUrl}/${id}`);
    }

    createDataSource(DataSource: DataSource): Observable<DataSource> {
        return this.http.post<DataSource>(this.apiUrl, DataSource);
    }

    updateDataSource(id: string, DataSource: DataSource): Observable<DataSource> {
        return this.http.put<DataSource>(`${this.apiUrl}/${id}`, DataSource);
    }

    deleteDataSource(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
