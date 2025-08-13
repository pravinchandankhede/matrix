namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;
using System.Collections.Generic;

public class UnstructuredDataSource : BaseModel
{
    public required StorageType StorageType { get; set; }
    public required String FilePathOrUrl { get; set; }
    public required List<String> FileTypes { get; set; } = new();
    public Boolean? OCRRequired { get; set; }
}
