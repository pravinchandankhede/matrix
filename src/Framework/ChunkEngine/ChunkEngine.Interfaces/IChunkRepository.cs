namespace Matrix.ChunkEngine.Interfaces;

using Matrix.DataModels.Chunks;
using System;
using System.Collections.Generic;

public interface IChunkRepository
{
    /// <summary>
    /// Gets the chunk by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the chunk.</param>
    /// <returns>The chunk if found; otherwise, null.</returns>
    Chunk? GetChunkById(Guid id);
    /// <summary>
    /// Gets all chunks.
    /// </summary>
    /// <returns>An enumerable of all chunks.</returns>
    IEnumerable<Chunk> GetAllChunks();
    /// <summary>
    /// Adds a new chunk.
    /// </summary>
    /// <param name="chunk">The chunk to add.</param>
    void AddChunk(Chunk chunk);
    /// <summary>
    /// Updates an existing chunk.
    /// </summary>
    /// <param name="chunk">The chunk to update.</param>
    void UpdateChunk(Chunk chunk);
    /// <summary>
    /// Deletes a chunk by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the chunk to delete.</param>
    void DeleteChunk(Guid id);
}
