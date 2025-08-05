namespace Matrix.DataModels.Chunks;

public class Chunk
{
    public Guid ChunkUId { get; set; }
    public required String ChunkId { get; set; }
    public required String Text { get; set; }
    public required String Type { get; set; }
    public required String ChunkSource { get; set; }
    public required String ChunkSourceId { get; set; }
    public Guid CorrelationUId { get; set; }
    public ChunkStrategy? ChunkStrategy { get; set; } = null;
}
