import { 
  BaseModel, 
  DataSourceType, 
  AccessMode, 
  AuthenticationType,
  VectorDbType,
  DistanceMetric,
  StorageType,
  MediaType,
  MessageFormat,
  HttpMethod,
  IntegrationType,
  DataFormat
} from './base.model';

/**
 * Structured data source interface for relational databases
 */
export interface StructuredDataSource extends BaseModel {
  host: string;
  port: number;
  databaseName: string;
  schema?: string;
  tableList: string[];
  queryTemplate?: string;
}

/**
 * Vector data source interface for vector databases
 */
export interface VectorDataSource extends BaseModel {
  vectorDbType: VectorDbType;
  indexName: string;
  embeddingModel: string;
  dimension: number;
  distanceMetric: DistanceMetric;
}

/**
 * External data source interface for API-based sources
 */
export interface ExternalDataSource extends BaseModel {
  apiEndpoint: string;
  httpMethod: HttpMethod;
  headers: Record<string, any>;
  queryParams: Record<string, any>;
  rateLimitPerMinute?: number;
}

/**
 * Multimedia data source interface for media files
 */
export interface MultimediaDataSource extends BaseModel {
  mediaType: MediaType;
  transcriptionEnabled?: boolean;
  storageLocation: string;
  supportedFormats: string[];
}

/**
 * Streaming data source interface for real-time data
 */
export interface StreamingDataSource extends BaseModel {
  brokerUrl: string;
  topicName: string;
  consumerGroup?: string;
  messageFormat: MessageFormat;
}

/**
 * Proprietary data source interface for vendor-specific sources
 */
export interface ProprietaryDataSource extends BaseModel {
  vendorName: string;
  integrationType: IntegrationType;
  customParserRequired?: boolean;
}

/**
 * Semi-structured data source interface for NoSQL databases
 */
export interface SemiStructuredDataSource extends BaseModel {
  endpointUrl: string;
  collectionName?: string;
  queryParameters: Record<string, any>;
  dataFormat: DataFormat;
}

/**
 * Unstructured data source interface for file-based sources
 */
export interface UnstructuredDataSource extends BaseModel {
  storageType: StorageType;
  filePathOrUrl: string;
  fileTypes: string[];
  ocrRequired?: boolean;
}

/**
 * Main data source interface containing all possible data source types
 */
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
  externalDataSource?: ExternalDataSource;
  multimediaDataSource?: MultimediaDataSource;
  streamingDataSource?: StreamingDataSource;
  proprietaryDataSource?: ProprietaryDataSource;
  semiStructuredDataSource?: SemiStructuredDataSource;
  unstructuredDataSource?: UnstructuredDataSource;
  isCustom: boolean;
}
