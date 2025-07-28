namespace Matrix.ChunkEngine.Interfaces;

public interface IChunkStrategy
{
    IEnumerable<IChunk> ProcessDocument(IDocument document);
}
