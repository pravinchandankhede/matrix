namespace Matrix.ChunkEngine.Worker.Strategies;

using Matrix.ChunkEngine.Interfaces;
using Matrix.DataModels.Chunks;
using System.Collections.Generic;

public class FixedSizeStrategy : IChunkStrategy
{
    public IEnumerable<Chunk> ProcessDocument(Document document)
    {
        String text = document.DocumentText;

        Int32 chunkSize = 1000;
        List<Chunk> chunks = [];

        for (Int32 i = 0; i < text.Length; i += chunkSize)
        {
            String chunkText = text.Substring(i, Math.Min(chunkSize, text.Length - i));
            FixedSizeChunk chunk = new()
            {
                ChunkUId = Guid.NewGuid(),
                ChunkId = Guid.NewGuid().ToString(), //TODO - Change this to a better ID.
                Type = "FixedSize", //TODO - Change this to enum.
                ChunkSource = document.DocumentId, //TODO - Change this to a better source.
                ChunkSourceId = document.DocumentUId.ToString(), //TODO - Change this to a better source ID.
                //TODO - Redo this.
                Text = chunkText,
                StartIndex = i,
                EndIndex = i + chunkText.Length - 1
            };

            //TODO - Add chunk to repository.
            chunks.Add(chunk);
        }

        return chunks;
    }
}
