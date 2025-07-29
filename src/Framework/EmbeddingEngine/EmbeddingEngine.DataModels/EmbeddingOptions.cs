namespace Matrix.EmbeddingEngine.DataModels;

public class EmbeddingOptions
{    
    /// <summary>
    /// Gets or sets the correlation unique identifier.
    /// </summary>
    public Guid CorrelationUId { get; set; } = Guid.NewGuid();
}
