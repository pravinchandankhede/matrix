namespace Matrix.ChunkEngine.Interfaces;

using Matrix.ChunkEngine.DataModels;

public interface IChunkStrategy
{
    IEnumerable<Chunk> ProcessDocument(IDocument document);
}
