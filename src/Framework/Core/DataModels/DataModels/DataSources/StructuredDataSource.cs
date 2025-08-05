namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;
using System.Collections.Generic;

public class StructuredDataSource : BaseModel
{
    public required String Host { get; set; }
    public required Int32 Port { get; set; }
    public required String DatabaseName { get; set; }
    public String? Schema { get; set; }
    public List<String> TableList { get; set; } = new();
    public String? QueryTemplate { get; set; }
}
