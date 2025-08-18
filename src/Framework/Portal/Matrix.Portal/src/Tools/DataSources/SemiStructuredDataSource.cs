namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;
using System.Collections.Generic;

public class SemiStructuredDataSource : BaseModel
{
    public required String EndpointUrl { get; set; }
    public String? CollectionName { get; set; }
    public Dictionary<String, Object> QueryParameters { get; set; } = new();
    public required DataFormat DataFormat { get; set; }
}