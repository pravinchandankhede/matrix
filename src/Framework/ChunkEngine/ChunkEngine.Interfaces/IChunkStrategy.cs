namespace Matrix.ChunkEngine.Interfaces;

using Matrix.DataModels.Chunks;

public interface IChunkStrategy
{
    IEnumerable<Chunk> ProcessDocument(IDocument document);
}
