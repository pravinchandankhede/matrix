namespace Matrix.DataModels.Chunks;

using Matrix.DataModels.Tools;

public class Document
{
    public Guid DocumentUId { get; set; }
    public required String DocumentId { get; set; }
    public required String DocumentText { get; set; }
    public ICollection<Metadata> Metadata { get; set; } = new List<Metadata>();
}
