namespace Matrix.KnowledgeLayer.DataModels;

public class KnowledgeCollection
{
    public Guid KnowledgeCollectionUId { get; set; }
    public String Name { get; set; } = String.Empty;
    public String Description { get; set; } = String.Empty;
    public String? IconUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Boolean IsPublic { get; set; }
    public Boolean IsArchived { get; set; }
}
