namespace Matrix.DataModels.DataSources;

using System;
using System.Collections.Generic;

public class MultimediaAttributes : DataSourceAttributes
{
    public required MediaType MediaType { get; set; }
    public Boolean? TranscriptionEnabled { get; set; }
    public required String StorageLocation { get; set; }
    public required List<String> SupportedFormats { get; set; } = new();
}
