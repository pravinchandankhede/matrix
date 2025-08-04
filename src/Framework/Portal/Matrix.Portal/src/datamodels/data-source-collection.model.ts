import { CustomizableModel } from './base.model';
import { DataSource } from './data-source.model';

export interface DataSourceCollection extends CustomizableModel {
    dataSourceCollectionUId: string; // Guid as string
    dataSources: DataSource[];
}
