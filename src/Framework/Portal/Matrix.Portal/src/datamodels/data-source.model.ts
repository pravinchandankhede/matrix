import { BaseModel, DataSourceType, AccessMode, AuthenticationType, StructuredDataSource as BaseStructuredDataSource, VectorDataSource as BaseVectorDataSource } from './base.model';

export interface StructuredDataSource extends BaseStructuredDataSource {
  // Inherits from base model
}

export interface VectorDataSource extends BaseVectorDataSource {
  // Inherits from base model
}

export interface DataSource extends BaseModel {
  dataSourceUId: string;
  name: string;
  type: DataSourceType;
  subType: string;
  description?: string;
  owner: string;
  isActive: boolean;
  accessMode: AccessMode;
  authenticationType: AuthenticationType;
  structuredDataSource?: StructuredDataSource;
  vectorDataSource?: VectorDataSource;
  isCustom: boolean;
}
