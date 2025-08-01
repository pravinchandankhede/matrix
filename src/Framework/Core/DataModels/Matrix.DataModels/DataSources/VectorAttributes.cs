namespace Matrix.Matrix.DataModels.DataSources;
using System;

public class VectorAttributes : DataSourceAttributes
{
    public required VectorDbType VectorDbType { get; set; }
    public required String IndexName { get; set; }
    public required String EmbeddingModel { get; set; }
    public required Int32 Dimension { get; set; }
    public required DistanceMetric DistanceMetric { get; set; }
}