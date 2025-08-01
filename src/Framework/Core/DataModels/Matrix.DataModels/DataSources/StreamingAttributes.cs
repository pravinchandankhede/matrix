namespace Matrix.Matrix.DataModels.DataSources;
using System;

public class StreamingAttributes : DataSourceAttributes
{
    public required String BrokerUrl { get; set; }
    public required String TopicName { get; set; }
    public String? ConsumerGroup { get; set; }
    public required MessageFormat MessageFormat { get; set; }
}