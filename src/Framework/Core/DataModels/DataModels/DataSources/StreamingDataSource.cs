namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;

public class StreamingDataSource : BaseModel
{
    public required String BrokerUrl { get; set; }
    public required String TopicName { get; set; }
    public String? ConsumerGroup { get; set; }
    public required MessageFormat MessageFormat { get; set; }
}