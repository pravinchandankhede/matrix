namespace Matrix.Matrix.DataModels.DataSources;

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
    public Boolean IsCustom { get; set; }
}
