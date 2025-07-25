namespace Matrix.DataSourceLayer.DataModels;

using System;
using System.Collections.Generic;

public class DataSource
{
    public required Guid DataSourceUId { get; set; }
    public required String Name { get; set; }
    public required DataSourceType Type { get; set; }
    public required String SubType { get; set; }
    public String? Description { get; set; }
    public List<String> Tags { get; set; } = new();
    public required String Owner { get; set; }
    public required DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public required Boolean IsActive { get; set; }
    public required AccessMode AccessMode { get; set; }
    public required AuthenticationType AuthenticationType { get; set; }
    public Dictionary<String, Object> ConnectionDetails { get; set; } = new();
    public DataSourceAttributes? DataSourceAttributes { get; set; }
}

// Enums and base class remain unchanged

public abstract class DataSourceAttributes
{
    // Optionally add common properties here
}

// Category-specific attribute classes

public class StructuredAttributes : DataSourceAttributes
{
    public required String Host { get; set; }
    public required Int32 Port { get; set; }
    public required String DatabaseName { get; set; }
    public String? Schema { get; set; }
    public List<String> TableList { get; set; } = new();
    public String? QueryTemplate { get; set; }
}

public class SemiStructuredAttributes : DataSourceAttributes
{
    public required String EndpointUrl { get; set; }
    public String? CollectionName { get; set; }
    public Dictionary<String, Object> QueryParameters { get; set; } = new();
    public required DataFormat DataFormat { get; set; }
}

public class UnstructuredAttributes : DataSourceAttributes
{
    public required StorageType StorageType { get; set; }
    public required String FilePathOrUrl { get; set; }
    public required List<String> FileTypes { get; set; } = new();
    public Boolean? OCRRequired { get; set; }
}

public class MultimediaAttributes : DataSourceAttributes
{
    public required MediaType MediaType { get; set; }
    public Boolean? TranscriptionEnabled { get; set; }
    public required String StorageLocation { get; set; }
    public required List<String> SupportedFormats { get; set; } = new();
}

public class StreamingAttributes : DataSourceAttributes
{
    public required String BrokerUrl { get; set; }
    public required String TopicName { get; set; }
    public String? ConsumerGroup { get; set; }
    public required MessageFormat MessageFormat { get; set; }
}

public class ExternalAttributes : DataSourceAttributes
{
    public required String ApiEndpoint { get; set; }
    public required HttpMethod HttpMethod { get; set; }
    public Dictionary<String, Object> Headers { get; set; } = new();
    public Dictionary<String, Object> QueryParams { get; set; } = new();
    public Int32? RateLimitPerMinute { get; set; }
}

public class ProprietaryAttributes : DataSourceAttributes
{
    public required String VendorName { get; set; }
    public required IntegrationType IntegrationType { get; set; }
    public Boolean? CustomParserRequired { get; set; }
}

public class VectorAttributes : DataSourceAttributes
{
    public required VectorDbType VectorDbType { get; set; }
    public required String IndexName { get; set; }
    public required String EmbeddingModel { get; set; }
    public required Int32 Dimension { get; set; }
    public required DistanceMetric DistanceMetric { get; set; }
}

// Enums remain unchanged