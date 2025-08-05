import { CustomizableModel } from './base.model';
import { DataSource } from './data-source.model';

export interface DataSourceCollection extends CustomizableModel {
    DataSourceCollectionUId: string; // Guid as string
    DataSources: DataSource[];
}
