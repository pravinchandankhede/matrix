import { BaseModel } from './base.model';
import { DataSource } from './data-source.model';

export interface DataSourceCollection extends BaseModel {
  dataSourceCollectionUId: string;
  name: string;
  description: string;
  dataSources: DataSource[];
  isCustom: boolean;
}
