namespace Matrix.DataModels.Tools;

using Matrix.DataModels.BaseModels;
using System;

public class Tool : BaseModel
{
    /// <summary>
    /// Unique identifier for the tool.
    /// </summary>
    public Guid ToolUId { get; set; }
    /// <summary>
    /// Name of the tool.
    /// </summary>
    public String Name { get; set; } = String.Empty;
    /// <summary>
    /// Description of the tool's functionality.
    /// </summary>
    public String Description { get; set; } = String.Empty;
    /// <summary>
    /// Type of the tool (e.g., "API", "Library", "Utility").
    /// </summary>
    public String Type { get; set; } = String.Empty;
    /// <summary>
    /// Version of the tool.
    /// </summary>
    public String Version { get; set; } = String.Empty;
}

