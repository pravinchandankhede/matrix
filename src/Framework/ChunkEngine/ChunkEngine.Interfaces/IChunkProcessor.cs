namespace Matrix.ChunkEngine.Interfaces;

using Matrix.DataModels.Chunks;

public interface IChunkProcessor
{
    IEnumerable<Chunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy);
}
