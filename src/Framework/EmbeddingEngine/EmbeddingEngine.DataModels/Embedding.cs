namespace Matrix.EmbeddingEngine.DataModels;

public class Embedding
{
    public Guid EmbeddingUId { get; set; }
    public String InputText { get; set; }
    public Single[] EmbeddingVector { get; set; }
    public Int32 TokenCount { get; set; }
    public String ModelUsed { get; set; }
    public Dictionary<String, String> Metadata { get; set; }
    public Guid CorrelationUId { get; set; }
}
