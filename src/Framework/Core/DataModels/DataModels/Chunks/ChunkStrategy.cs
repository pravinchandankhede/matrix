namespace Matrix.DataModels.Chunks;

using Matrix.DataModels.BaseModels;
using System;

public class ChunkStrategy : BaseModel
{
    public Guid ChunkStrategyUId { get; set; }
    public String Name { get; set; } = String.Empty;
    public String Description { get; set; } = String.Empty;
    public String? Parameters { get; set; } = null;
    public String Type { get; set; } = String.Empty;
}
