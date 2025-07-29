namespace Matrix.ChunkEngine.Interfaces;

using Matrix.ChunkEngine.DataModels;

public interface IChunkProcessor
{    
    IEnumerable<Chunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy);
}
