namespace Matrix.DataModels.Tools;

using Matrix.DataModels.BaseModels;
using System;

public class Metadata : BaseModel
{
    public Guid MetadataUId { get; set; }
    public String Name { get; set; } = String.Empty;
    public String Value { get; set; } = String.Empty;
}
