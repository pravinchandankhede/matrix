namespace Matrix.Matrix.DataModels.Knowledge;

using global::Matrix.Matrix.DataModels.Chunks;
using global::Matrix.Matrix.DataModels.DataSources;
using global::Matrix.Matrix.DataModels.Models;
using System;

public class Knowledge
{
    public Guid KnowledgeUId { get; set; }
    public String Type { get; set; }
    public DataSourceCollection DataSourceCollection { get; set; }
    public Model Model { get; set; }
    public String Status { get; set; }
    public DataSource OutputDataSource { get; set; }
    public Chunk ChunkStrategy { get; set; }
}

