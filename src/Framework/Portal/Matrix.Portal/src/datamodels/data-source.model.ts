export interface DataSource {
  dataSourceUId: string;
  name: string;
  type: DataSourceType;
  subType: string;
  description?: string;
  tags?: string[];
  owner: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
  accessMode: AccessMode;
  authenticationType: AuthenticationType;
  connectionDetails: any;
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
  host: string;
  port: number;
  databaseName: string;
  schema?: string;
  tableList?: string[];
  queryTemplate?: string;
}

export interface SemiStructuredConnectionDetails {
  endpointUrl: string;
  collectionName?: string;
  queryParameters?: any;
  dataFormat: 'JSON' | 'XML' | 'YAML';
}

export interface UnstructuredConnectionDetails {
  storageType: 'FileSystem' | 'S3' | 'AzureBlob' | 'GDrive';
  filePathOrUrl: string;
  fileTypes: string[];
  ocrRequired?: boolean;
}

export interface MultimediaConnectionDetails {
  mediaType: 'Audio' | 'Video' | 'Image';
  transcriptionEnabled?: boolean;
  storageLocation: string;
  supportedFormats: string[];
}

export interface StreamingConnectionDetails {
  brokerUrl: string;
  topicName: string;
  consumerGroup?: string;
  messageFormat: 'JSON' | 'Avro' | 'Protobuf';
}

export interface ExternalConnectionDetails {
  apiEndpoint: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: any;
  queryParams?: any;
  rateLimitPerMinute?: number;
}

export interface ProprietaryConnectionDetails {
  vendorName: string;
  integrationType: 'SDK' | 'API' | 'FileExport';
  customParserRequired?: boolean;
}

export interface VectorConnectionDetails {
  vectorDbType: 'Pinecone' | 'FAISS' | 'Weaviate' | 'Qdrant';
  indexName: string;
  embeddingModel: string;
  dimension: number;
  distanceMetric: 'Cosine' | 'Euclidean' | 'DotProduct';
}
