namespace Matrix.ChunkEngine.DataModels;

public class FixedSizeChunk : Chunk
{
    public String Text { get; set; }
    public Int32 StartIndex { get; set; }
    public Int32 EndIndex { get; set; }
}
