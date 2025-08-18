import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
    DataSource, 
    StructuredDataSource, 
    VectorDataSource, 
    ExternalDataSource,
    MultimediaDataSource,
    StreamingDataSource,
    ProprietaryDataSource,
    SemiStructuredDataSource,
    UnstructuredDataSource,
    DataSourceType
} from '../datamodels';

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

    createDataSource(dataSource: DataSource): Observable<DataSource> {
        return this.http.post<DataSource>(this.apiUrl, dataSource);
    }

    updateDataSource(dataSource: DataSource): Observable<DataSource> {
        return this.http.put<DataSource>(`${this.apiUrl}/${dataSource.dataSourceUId}`, dataSource);
    }

    deleteDataSource(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Specialized methods for different data source types
    getDataSourcesByType(type: DataSourceType): Observable<DataSource[]> {
        return this.http.get<DataSource[]>(`${this.apiUrl}/type/${type}`);
    }

    testConnection(dataSourceId: string): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/${dataSourceId}/test-connection`, {});
    }

    // Structured data source specific methods
    validateStructuredConnection(config: StructuredDataSource): Observable<{ valid: boolean; message: string }> {
        return this.http.post<{ valid: boolean; message: string }>(`${this.apiUrl}/validate/structured`, config);
    }

    getTables(dataSourceId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/${dataSourceId}/tables`);
    }

    // Vector data source specific methods
    validateVectorConnection(config: VectorDataSource): Observable<{ valid: boolean; message: string }> {
        return this.http.post<{ valid: boolean; message: string }>(`${this.apiUrl}/validate/vector`, config);
    }

    getVectorIndices(dataSourceId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/${dataSourceId}/indices`);
    }

    // External data source specific methods
    validateExternalConnection(config: ExternalDataSource): Observable<{ valid: boolean; message: string }> {
        return this.http.post<{ valid: boolean; message: string }>(`${this.apiUrl}/validate/external`, config);
    }

    // Get data source configuration by type
    getDataSourceConfig(dataSourceId: string, type: DataSourceType): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${dataSourceId}/config/${type}`);
    }
}
