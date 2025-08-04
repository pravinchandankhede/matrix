namespace Matrix.Matrix.DataModels.BaseModels;
using System;

public class BaseModel
{
    public String CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
    public String ModifiedBy { get; set; }
    public DateTime ModifiedOn { get; set; }
    public Guid CorrelationUId { get; set; }

}
