namespace Matrix.Matrix.DataModels.DataSources;
using System;
using System.Collections.Generic;

public class UnstructuredAttributes : DataSourceAttributes
{
    public required StorageType StorageType { get; set; }
    public required String FilePathOrUrl { get; set; }
    public required List<String> FileTypes { get; set; } = new();
    public Boolean? OCRRequired { get; set; }
}
