namespace Matrix.DataModels.DataSources;

public class DataSourceCollection
{
    public Guid DataSourceCollectionUId { get; set; }
    public required String Name { get; set; }
    public required String Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
    public List<DataSource> DataSources { get; set; } = new List<DataSource>();
    public Boolean IsCustom { get; set; }
}
