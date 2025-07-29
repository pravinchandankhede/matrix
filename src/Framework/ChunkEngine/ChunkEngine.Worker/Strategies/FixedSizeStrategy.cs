namespace Matrix.ChunkEngine.Worker.Strategies;

using Matrix.ChunkEngine.DataModels;
using Matrix.ChunkEngine.Interfaces;
using System.Collections.Generic;

internal class FixedSizeStrategy : IChunkStrategy
{
    public IEnumerable<Chunk> ProcessDocument(IDocument document)
    {
        var text = document.GetText();

        var chunkSize = 1000;
        var chunks = new List<Chunk>();

        for (int i = 0; i < text.Length; i += chunkSize)
        {
            var chunkText = text.Substring(i, Math.Min(chunkSize, text.Length - i));
            var chunk = new FixedSizeChunk
            {
                Text = chunkText,
                StartIndex = i,
                EndIndex = i + chunkText.Length - 1
            };
            chunks.Add(chunk);
        }

        return chunks;
    }
}
