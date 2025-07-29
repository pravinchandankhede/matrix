namespace Matrix.ChunkEngine.Worker;

using Matrix.ChunkEngine.DataModels;
using Matrix.ChunkEngine.Interfaces;
using System.Collections.Generic;

internal class ChunkProcessor : IChunkProcessor
{
    public IEnumerable<Chunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy)
    {
        return chunkStrategy.ProcessDocument(document);
    }
}
