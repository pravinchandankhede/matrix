/**
 * Base interface containing common audit fields and properties
 * that are shared across all domain models.
 */
export interface Metadata {
  [key: string]: any;
}

export interface BaseModel {
  /** User or system that created this entity */
  createdBy: string;
  
  /** Timestamp when the entity was created (ISO date string) */
  createdDate: Date;
  
  /** User or system that last updated this entity */
  modifiedBy: string;
  
  /** Timestamp when the entity was last updated (ISO date string) */
  modifiedDate: Date;
  
  /** Unique identifier for the entity */
  correlationUId: string; // Guid as string
  
  /** Version number for optimistic concurrency control */
  rowVersion?: Uint8Array;
  
  /** Additional metadata as key-value pairs */
  metadata: Metadata[];
}

/**
 * Base interface for entities that can be customized by users
 */
export interface CustomizableModel extends BaseModel {
  /** Whether this is a custom user-created entity */
  IsCustom: boolean;
  
  /** Owner of the entity */
  Owner: string;
}

/**
 * TypeScript enums mapped from C# Enums
 */
export enum DataSourceType {
  Structured = 'Structured',
  SemiStructured = 'SemiStructured',
  Unstructured = 'Unstructured',
  Multimedia = 'Multimedia',
  Streaming = 'Streaming',
  External = 'External',
  Proprietary = 'Proprietary',
  Vector = 'Vector',
}

export enum AccessMode {
  ReadOnly = 'ReadOnly',
  ReadWrite = 'ReadWrite',
}

export enum AuthenticationType {
  APIKey = 'APIKey',
  OAuth2 = 'OAuth2',
  BasicAuth = 'BasicAuth',
  Token = 'Token',
  None = 'None',
}

export enum DataFormat {
  JSON = 'JSON',
  XML = 'XML',
  YAML = 'YAML',
}

export enum StorageType {
  FileSystem = 'FileSystem',
  S3 = 'S3',
  AzureBlob = 'AzureBlob',
  GDrive = 'GDrive',
}

export enum MediaType {
  Audio = 'Audio',
  Video = 'Video',
  Image = 'Image',
}

export enum MessageFormat {
  JSON = 'JSON',
  Avro = 'Avro',
  Protobuf = 'Protobuf',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum IntegrationType {
  SDK = 'SDK',
  API = 'API',
  FileExport = 'FileExport',
}

export enum VectorDbType {
  Pinecone = 'Pinecone',
  FAISS = 'FAISS',
  Weaviate = 'Weaviate',
  Qdrant = 'Qdrant',
}

export enum DistanceMetric {
  Cosine = 'Cosine',
  Euclidean = 'Euclidean',
  DotProduct = 'DotProduct',
}

/**
 * Interfaces for related models
 */
export interface ExternalAttributes {
  apiEndpoint: string;
  httpMethod: HttpMethod;
  headers: Record<string, any>;
  queryParams: Record<string, any>;
  rateLimitPerMinute?: number;
}

export interface StructuredDataSource extends BaseModel {
  host: string;
  port: number;
  databaseName: string;
  schema?: string;
  tableList: string[];
  queryTemplate?: string;
}

export interface VectorDataSource extends BaseModel {
  vectorDbType: VectorDbType;
  indexName: string;
  embeddingModel: string;
  dimension: number;
  distanceMetric: DistanceMetric;
}
