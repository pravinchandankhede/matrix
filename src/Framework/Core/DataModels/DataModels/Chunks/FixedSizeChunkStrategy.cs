namespace Matrix.DataModels.Chunks;

public class FixedSizeChunkStrategy : ChunkStrategy
{
    public FixedSizeChunkStrategy()
    {        
        Type = "FixedSize";
    }

    public Int32 StartIndex { get; set; }
    public Int32 EndIndex { get; set; }
}
