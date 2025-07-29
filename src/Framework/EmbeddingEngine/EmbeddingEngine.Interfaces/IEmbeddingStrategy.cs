namespace Matrix.EmbeddingEngine.Interfaces;

using Matrix.EmbeddingEngine.DataModels;

public interface IEmbeddingStrategy
{
    Embedding Embed(EmbeddingOptions options, String inputText);
}
