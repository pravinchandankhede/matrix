namespace Matrix.DataModels.Features;

using Matrix.DataModels.BaseModels;
using System;

public class Capability : BaseModel
{
    /// <summary>
    /// Unique identifier for the capability.
    /// </summary>
    public Guid CapabilityUId { get; set; }
    /// <summary>
    /// Name of the capability.
    /// </summary>
    public String Name { get; set; } = String.Empty;
    /// <summary>
    /// Description of the capability.
    /// </summary>
    public String Description { get; set; } = String.Empty;
    /// <summary>
    /// Type of the capability (e.g., "AI", "Data Processing", "Communication").
    /// </summary>
    public String Type { get; set; } = String.Empty;
}
