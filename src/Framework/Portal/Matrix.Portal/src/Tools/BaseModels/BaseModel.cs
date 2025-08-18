namespace Matrix.DataModels.BaseModels;

using Matrix.DataModels.Tools;
using System;

public class BaseModel
{
    public String CreatedBy { get; set; } = "Matrix";
    public DateTime CreatedDate { get; set; }
    public String ModifiedBy { get; set; } = "Matrix";
    public DateTime ModifiedDate { get; set; }
    public Guid CorrelationUId { get; set; }
    public Byte[] RowVersion { get; set; } = Array.Empty<Byte>();
    /// <summary>
    /// Metadata about the tool, stored as a property bag.
    /// </summary>
    public ICollection<Metadata> Metadata { get; set; } = new List<Metadata>();
}
