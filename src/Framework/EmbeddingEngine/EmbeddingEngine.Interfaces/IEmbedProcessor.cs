namespace Matrix.EmbeddingEngine.Interfaces;

using Matrix.DataModels.Embeddings;

public interface IEmbedProcessor
{
    IEnumerable<Embedding> GetEmbeddings(String text);
}
