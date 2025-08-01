namespace Matrix.Matrix.DataModels.Chunks;

public class Document
{
    public Guid DocumentUId { get; set; }
    public String DocumentId { get; set; }
    public String DocumentText { get; set; }
    public Dictionary<String,String> Metadata { get; set; }
}
