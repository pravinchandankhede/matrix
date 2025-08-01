namespace Matrix.Matrix.DataModels.DataSources;
using System;
using System.Collections.Generic;

public class ExternalAttributes : DataSourceAttributes
{
    public required String ApiEndpoint { get; set; }
    public required HttpMethod HttpMethod { get; set; }
    public Dictionary<String, Object> Headers { get; set; } = new();
    public Dictionary<String, Object> QueryParams { get; set; } = new();
    public Int32? RateLimitPerMinute { get; set; }
}
