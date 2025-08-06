import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DataSource } from '../datamodels/data-source.model';
import { DataSourceType, AccessMode, AuthenticationType } from '../datamodels/base.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    private apiUrl = 'https://localhost:7179/DataSources';

    constructor(private http: HttpClient) { }

    getDataSources(): Observable<DataSource[]> {
        // For now, return mock data until API is available
        return of(this.getMockDataSources());
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

    private getMockDataSources(): DataSource[] {
        return [
            {
                dataSourceUId: 'ds-001',
                name: 'Customer Database',
                type: DataSourceType.Structured,
                subType: 'SQL Server',
                description: 'Primary customer information database',
                owner: 'Admin',
                isActive: true,
                accessMode: AccessMode.ReadWrite,
                authenticationType: AuthenticationType.BasicAuth,
                isCustom: false,
                createdBy: 'Admin',
                createdDate: new Date('2024-01-10'),
                modifiedBy: 'Admin',
                modifiedDate: new Date('2024-08-01'),
                correlationUId: 'ds-corr-001',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                dataSourceUId: 'ds-002',
                name: 'Product Catalog API',
                type: DataSourceType.SemiStructured,
                subType: 'REST API',
                description: 'External product catalog API integration',
                owner: 'DataTeam',
                isActive: false,
                accessMode: AccessMode.ReadOnly,
                authenticationType: AuthenticationType.APIKey,
                isCustom: true,
                createdBy: 'DataTeam',
                createdDate: new Date('2024-03-15'),
                modifiedBy: 'DataTeam',
                modifiedDate: new Date('2024-07-20'),
                correlationUId: 'ds-corr-002',
                rowVersion: new Uint8Array(),
                metadata: []
            }
        ];
    }
}
