namespace Matrix.Matrix.DataModels.DataSources;

public enum DataSourceType
{
    Structured,
    SemiStructured,
    Unstructured,
    Multimedia,
    Streaming,
    External,
    Proprietary,
    Vector
}

public enum AccessMode
{
    ReadOnly,
    ReadWrite
}

public enum AuthenticationType
{
    APIKey,
    OAuth2,
    BasicAuth,
    Token,
    None
}

public enum DataFormat
{
    JSON,
    XML,
    YAML
}

public enum StorageType
{
    FileSystem,
    S3,
    AzureBlob,
    GDrive
}

public enum MediaType
{
    Audio,
    Video,
    Image
}

public enum MessageFormat
{
    JSON,
    Avro,
    Protobuf
}

public enum HttpMethod
{
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
}

public enum IntegrationType
{
    SDK,
    API,
    FileExport
}

public enum VectorDbType
{
    Pinecone,
    FAISS,
    Weaviate,
    Qdrant
}

public enum DistanceMetric
{
    Cosine,
    Euclidean,
    DotProduct
}
