namespace Matrix.ChunkEngine.Interfaces;

using Matrix.DataModels.Chunks;

public interface IChunkProcessor
{
    IEnumerable<Chunk> GetChunks(Document document, IChunkStrategy chunkStrategy);
}
