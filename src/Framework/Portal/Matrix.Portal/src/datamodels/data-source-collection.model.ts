import { DataSource } from './data-source.model';

export interface DataSourceCollection {
    dataSourceCollectionUId: string; // Guid as string
    name: string;
    description: string;
    createdDate: string; // ISO string
    lastModifiedDate: string; // ISO string
    dataSources: DataSource[];
    isCustom: boolean;
}
