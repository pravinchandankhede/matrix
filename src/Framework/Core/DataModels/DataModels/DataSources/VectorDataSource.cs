namespace Matrix.DataModels.DataSources;

using Matrix.DataModels.BaseModels;
using System;

public class VectorDataSource : BaseModel
{
    public required VectorDbType VectorDbType { get; set; }
    public required String IndexName { get; set; }
    public required String EmbeddingModel { get; set; }
    public required Int32 Dimension { get; set; }
    public required DistanceMetric DistanceMetric { get; set; }
}