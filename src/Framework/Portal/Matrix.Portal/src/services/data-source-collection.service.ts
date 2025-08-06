import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DataSourceCollection } from '../datamodels/data-source-collection.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourceCollectionService {
    private apiUrl = 'https://localhost:7179/DataSourceCollections';

    constructor(private http: HttpClient) { }

    getDataSourceCollections(): Observable<DataSourceCollection[]> {
        // For now, return mock data until API is available
        return of(this.getMockDataSourceCollections());
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

    private getMockDataSourceCollections(): DataSourceCollection[] {
        return [
            {
                dataSourceCollectionUId: 'collection-001',
                name: 'Customer Analytics Collection',
                description: 'Comprehensive collection of customer data sources for analytics',
                dataSources: [], // Will be populated separately
                isCustom: false,
                createdBy: 'Admin',
                createdDate: new Date('2024-01-20'),
                modifiedBy: 'Admin',
                modifiedDate: new Date('2024-08-01'),
                correlationUId: 'coll-corr-001',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                dataSourceCollectionUId: 'collection-002',
                name: 'Product Data Hub',
                description: 'Central collection for all product-related data sources',
                dataSources: [], // Will be populated separately
                isCustom: true,
                createdBy: 'DataTeam',
                createdDate: new Date('2024-02-15'),
                modifiedBy: 'DataTeam',
                modifiedDate: new Date('2024-07-10'),
                correlationUId: 'coll-corr-002',
                rowVersion: new Uint8Array(),
                metadata: []
            },
            {
                dataSourceCollectionUId: 'collection-003',
                name: 'Financial Reporting Sources',
                description: 'Collection of financial data sources for compliance and reporting',
                dataSources: [], // Will be populated separately
                isCustom: false,
                createdBy: 'Finance Lead',
                createdDate: new Date('2024-03-01'),
                modifiedBy: 'Finance Lead',
                modifiedDate: new Date('2024-06-30'),
                correlationUId: 'coll-corr-003',
                rowVersion: new Uint8Array(),
                metadata: []
            }
        ];
    }
}
