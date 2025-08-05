import { CustomizableModel } from './base.model';

export interface DataSourceCollection extends CustomizableModel {
  DataSourceCollectionUId: string;
  Collections: DataSource[];
}

export interface DataSource extends CustomizableModel {
  DataSourceUId: string;
  Type: DataSourceType;
  SubType: string;
  AccessMode: AccessMode;
  AuthenticationType: AuthenticationType;
  ConnectionDetails: any;
}

export type DataSourceType =
  | 'Structured'
  | 'SemiStructured'
  | 'Unstructured'
  | 'Multimedia'
  | 'Streaming'
  | 'External'
  | 'Proprietary'
  | 'Vector';

export type AccessMode = 'ReadOnly' | 'ReadWrite';

export type AuthenticationType = 'APIKey' | 'OAuth2' | 'BasicAuth' | 'Token' | 'None';

// Category-specific attribute interfaces (optional, for strong typing)

export interface StructuredConnectionDetails {
  Host: string;
  Port: number;
  DatabaseName: string;
  Schema?: string;
  TableList?: string[];
  QueryTemplate?: string;
}

export interface SemiStructuredConnectionDetails {
  EndpointUrl: string;
  CollectionName?: string;
  QueryParameters?: any;
  DataFormat: 'JSON' | 'XML' | 'YAML';
}

export interface UnstructuredConnectionDetails {
  StorageType: 'FileSystem' | 'S3' | 'AzureBlob' | 'GDrive';
  FilePathOrUrl: string;
  FileTypes: string[];
  OcrRequired?: boolean;
}

export interface MultimediaConnectionDetails {
  MediaType: 'Audio' | 'Video' | 'Image';
  TranscriptionEnabled?: boolean;
  StorageLocation: string;
  SupportedFormats: string[];
}

export interface StreamingConnectionDetails {
  BrokerUrl: string;
  TopicName: string;
  ConsumerGroup?: string;
  MessageFormat: 'JSON' | 'Avro' | 'Protobuf';
}

export interface ExternalConnectionDetails {
  ApiEndpoint: string;
  HttpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  Headers?: any;
  QueryParams?: any;
  RateLimitPerMinute?: number;
}

export interface ProprietaryConnectionDetails {
  VendorName: string;
  IntegrationType: 'SDK' | 'API' | 'FileExport';
  CustomParserRequired?: boolean;
}

export interface VectorConnectionDetails {
  VectorDbType: 'Pinecone' | 'FAISS' | 'Weaviate' | 'Qdrant';
  IndexName: string;
  EmbeddingModel: string;
  Dimension: number;
  DistanceMetric: 'Cosine' | 'Euclidean' | 'DotProduct';
}
