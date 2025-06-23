namespace Matrix.Ingestion.Interfaces;

public interface ISupportEmbedding
{
    String Name { get; }
    Decimal EmbeddingVersion { get; }
    Int32 count { get; }
}
