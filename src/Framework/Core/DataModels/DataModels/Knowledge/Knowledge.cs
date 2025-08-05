namespace Matrix.DataModels.Knowledge;

using Matrix.DataModels.Chunks;
using Matrix.DataModels.DataSources;
using Matrix.DataModels.Models;
using System;

public class Knowledge
{
    public Guid KnowledgeUId { get; set; }
    public required String Type { get; set; }
    public DataSourceCollection DataSourceCollection { get; set; } = null!;
    public Model Model { get; set; } = null!;
    public required String Status { get; set; }
    public DataSource OutputDataSource { get; set; } = null!;
    public Chunk ChunkStrategy { get; set; } = null!;
}

