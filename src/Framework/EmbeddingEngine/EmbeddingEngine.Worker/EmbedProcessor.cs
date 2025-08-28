namespace Matrix.EmbeddingEngine.Worker;

using Matrix.DataModels.Embeddings;
using Matrix.EmbeddingEngine.Interfaces;
using System.Collections.Generic;

public class EmbedProcessor : IEmbedProcessor
{
    public IEnumerable<Embedding> GetEmbeddings(String text)
    {
        throw new NotImplementedException();
    }
}
