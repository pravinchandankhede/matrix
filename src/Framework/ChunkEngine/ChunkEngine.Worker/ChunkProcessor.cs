namespace Matrix.ChunkEngine.Worker;

using Matrix.ChunkEngine.Interfaces;
using Matrix.DataModels.Chunks;
using System.Collections.Generic;

public class ChunkProcessor : IChunkProcessor
{
    public IEnumerable<Chunk> GetChunks(Document document, IChunkStrategy chunkStrategy)
    {
        return chunkStrategy.ProcessDocument(document);
    }
}
