namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;

public class ProprietaryDataSource : BaseModel
{
    public required String VendorName { get; set; }
    public required IntegrationType IntegrationType { get; set; }
    public Boolean? CustomParserRequired { get; set; }
}
