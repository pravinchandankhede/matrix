namespace Matrix.DataSourceLayer.DataLayer;

using Matrix.DataSourceLayer.DataModels;
using Matrix.DataSourceLayer.Interfaces;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DataSourceCollectionRepository : IDataSourceCollectionRepository
{
    public List<DataSourceCollection> _DataSourceCollectionList { get; set; } = [];

    public DataSourceCollectionRepository()
    {
        var directory = AppDomain.CurrentDomain.BaseDirectory;
        var DataSourceCollections = File.ReadAllText(Path.Join(directory, "DataSourceCollections.json"));

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        options.Converters.Add(new JsonStringEnumConverter());

        _DataSourceCollectionList = System.Text.Json.JsonSerializer.Deserialize<List<DataSourceCollection>>(DataSourceCollections,options) ?? new List<DataSourceCollection>();
    }

    public void AddDataSourceCollection(DataSourceCollection DataSourceCollection)
    {
        _DataSourceCollectionList.Add(DataSourceCollection);
    }

    public void DeleteDataSourceCollection(Guid id)
    {
       _DataSourceCollectionList.RemoveAll(ds => ds.DataSourceCollectionUId == id);
    }

    public IEnumerable<DataSourceCollection> GetAllDataSourceCollections()
    {
        return _DataSourceCollectionList;
    }

    public DataSourceCollection? GetDataSourceCollectionById(Guid id)
    {
        throw new NotImplementedException();
    }

    public void UpdateDataSourceCollection(DataSourceCollection DataSourceCollection)
    {
        throw new NotImplementedException();
    }
}
