namespace Matrix.DataModels.DataSources;

using System;

public class ProprietaryAttributes : DataSourceAttributes
{
    public required String VendorName { get; set; }
    public required IntegrationType IntegrationType { get; set; }
    public Boolean? CustomParserRequired { get; set; }
}
