namespace Matrix.ChunkEngine.DataLayer;

using Matrix.ChunkEngine.Interfaces;
using Matrix.DataModels.Chunks;
using System.Collections.Generic;

public class ChunkRepository : IChunkRepository
{
    public List<Chunk> _chunkList { get; set; } = [];

    public ChunkRepository()
    {
        String directory = AppDomain.CurrentDomain.BaseDirectory;
        String Chunks = File.ReadAllText(Path.Join(directory, "Chunks.json"));
        // Assuming Chunks.json contains a JSON array of Chunk objects
        _chunkList = System.Text.Json.JsonSerializer.Deserialize<List<Chunk>>(Chunks) ?? new List<Chunk>();
    }

    public void AddChunk(Chunk Chunk)
    {
        _chunkList.Add(Chunk);
    }

    public IEnumerable<Chunk> GetAllChunks()
    {
        return _chunkList;
    }

    public Chunk? GetChunkById(Guid id)
    {
        return _chunkList.FirstOrDefault(m => m.ChunkUId == id);
    }

    public void DeleteChunk(Guid id)
    {
        _chunkList.RemoveAll(m => m.ChunkUId == id);
    }

    public void UpdateChunk(Chunk Chunk)
    {
        Int32 ChunkIndex = _chunkList.FindIndex(m => m.ChunkUId == Chunk.ChunkUId);
        if (ChunkIndex >= 0)
        {
            _chunkList[ChunkIndex] = Chunk;
        }
        else
        {
            throw new KeyNotFoundException($"Chunk with name {Chunk.ChunkUId} not found.");
        }
    }
}

