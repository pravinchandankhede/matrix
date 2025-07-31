namespace Matrix.ChunkEngine.DataModels;

public class Chunk
{
    public Guid ChunkUId { get; set; }
    public String ChunkId { get; set; }
    public String Text { get; set; }
    public String Type { get; set; }
    public String ChunkSource { get; set; }
    public String ChunkSourceId { get; set; }
    public Guid CorrelationUId { get; set; }
}
