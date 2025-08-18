namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;
using System.Collections.Generic;

public class ExternalDataSource : BaseModel
{
    public required String ApiEndpoint { get; set; }
    public required HttpMethod HttpMethod { get; set; }
    public Dictionary<String, Object> Headers { get; set; } = new();
    public Dictionary<String, Object> QueryParams { get; set; } = new();
    public Int32? RateLimitPerMinute { get; set; }
}