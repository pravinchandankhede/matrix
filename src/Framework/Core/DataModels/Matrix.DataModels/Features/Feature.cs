namespace Matrix.DataModels.Features;

using Matrix.DataModels.BaseModels;
using System;

public class Feature : BaseModel
{
    public Guid FeatureUId { get; set; }
    public String Name { get; set; } = String.Empty;
    public String Description { get; set; } = String.Empty;
}
