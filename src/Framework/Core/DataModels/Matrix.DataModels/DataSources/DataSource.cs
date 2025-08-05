namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;

public class DataSource : BaseModel
{
    public required Guid DataSourceUId { get; set; }
    public required String Name { get; set; }
    public required DataSourceType Type { get; set; }
    public required String SubType { get; set; }
    public String? Description { get; set; }
    public required String Owner { get; set; }
    public required Boolean IsActive { get; set; }
    public required AccessMode AccessMode { get; set; }
    public required AuthenticationType AuthenticationType { get; set; }
    public StructuredDataSource? StructuredDataSource { get; set; } = null;
    public VectorDataSource? VectorDataSource { get; set; } = null;

    public Boolean IsCustom { get; set; }
}
