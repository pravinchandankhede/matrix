namespace Matrix.ChunkEngine.Interfaces;

public interface IChunkProcessor
{    
    IEnumerable<IChunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy);
}
