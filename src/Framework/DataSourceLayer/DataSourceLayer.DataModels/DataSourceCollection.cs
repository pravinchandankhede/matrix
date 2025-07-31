namespace Matrix.DataSourceLayer.DataModels;

public  class DataSourceCollection
{
    public Guid DataSourceCollectionUId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
    public List<DataSource> DataSources { get; set; } = new List<DataSource>();
    public Boolean IsCustom { get; set; }
}
