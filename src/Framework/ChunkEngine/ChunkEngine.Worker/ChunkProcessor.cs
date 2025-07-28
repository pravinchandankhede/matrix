namespace Matrix.ChunkEngine.Worker;

using Matrix.ChunkEngine.Interfaces;
using System.Collections.Generic;

internal class ChunkProcessor : IChunkProcessor
{
    public IEnumerable<IChunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy)
    {
        return chunkStrategy.ProcessDocument(document);
    }
}
