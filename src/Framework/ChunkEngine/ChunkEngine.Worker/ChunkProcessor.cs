namespace Matrix.ChunkEngine.Worker;

using Matrix.ChunkEngine.Interfaces;
using Matrix.DataModels.Chunks;
using System.Collections.Generic;

internal class ChunkProcessor : IChunkProcessor
{
    public IEnumerable<Chunk> GetChunks(IDocument document, IChunkStrategy chunkStrategy)
    {
        return chunkStrategy.ProcessDocument(document);
    }
}
