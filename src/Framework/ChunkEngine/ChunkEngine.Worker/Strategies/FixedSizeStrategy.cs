namespace Matrix.ChunkEngine.Worker.Strategies;

using Matrix.ChunkEngine.Interfaces;
using Matrix.DataModels.Chunks;
using System.Collections.Generic;

internal class FixedSizeStrategy : IChunkStrategy
{
    public IEnumerable<Chunk> ProcessDocument(IDocument document)
    {
        String text = document.GetText();

        Int32 chunkSize = 1000;
        List<Chunk> chunks = new List<Chunk>();

        for (Int32 i = 0; i < text.Length; i += chunkSize)
        {
            String chunkText = text.Substring(i, Math.Min(chunkSize, text.Length - i));
            FixedSizeChunkStrategy chunk = new FixedSizeChunkStrategy
            {
                //TODO - Redo this.
                Description = chunkText,
                StartIndex = i,
                EndIndex = i + chunkText.Length - 1
            };
            //TODO - Add chunk to repository.
            //chunks.Add(chunk);
        }

        return chunks;
    }
}
