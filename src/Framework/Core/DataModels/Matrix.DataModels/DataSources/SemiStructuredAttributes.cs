namespace Matrix.DataModels.DataSources;

using System;
using System.Collections.Generic;

public class SemiStructuredAttributes : DataSourceAttributes
{
    public required String EndpointUrl { get; set; }
    public String? CollectionName { get; set; }
    public Dictionary<String, Object> QueryParameters { get; set; } = new();
    public required DataFormat DataFormat { get; set; }
}
