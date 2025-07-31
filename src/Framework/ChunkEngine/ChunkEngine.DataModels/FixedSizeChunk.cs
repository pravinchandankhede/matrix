namespace Matrix.ChunkEngine.DataModels;

public class FixedSizeChunk : Chunk
{
    public FixedSizeChunk()
    {
        ChunkUId = Guid.NewGuid();
        ChunkId = Guid.NewGuid().ToString();
        Type = "FixedSize";
    }

    public Int32 StartIndex { get; set; }
    public Int32 EndIndex { get; set; }
}
