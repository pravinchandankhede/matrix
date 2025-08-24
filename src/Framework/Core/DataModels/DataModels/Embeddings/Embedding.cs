namespace Matrix.DataModels.Embeddings;

public class Embedding
{
    public Guid EmbeddingUId { get; set; }
    public required String InputText { get; set; }
    public required Single[] EmbeddingVector { get; set; }
    public Int32 TokenCount { get; set; }
    public required String ModelUsed { get; set; }
    public required Dictionary<String, String> Metadata { get; set; }
    public Guid CorrelationUId { get; set; }
}
