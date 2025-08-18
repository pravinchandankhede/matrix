import { DataSource } from './data-source.model';

/**
 * Data source collection interface for grouping related data sources
 */
export interface DataSourceCollection {
  dataSourceCollectionUId: string;
  name: string;
  description: string;
  createdDate: Date;
  lastModifiedDate: Date;
  dataSources: DataSource[];
  isCustom: boolean;
}
