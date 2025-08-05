namespace Matrix.DataSourceLayer.DataLayer;

using Matrix.DataModels.DataSources;
using Matrix.DataSourceLayer.Interfaces;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DataSourceCollectionRepository : IDataSourceCollectionRepository
{
    public List<DataSourceCollection> _dataSourceCollectionList { get; set; } = [];

    public DataSourceCollectionRepository()
    {
        String directory = AppDomain.CurrentDomain.BaseDirectory;
        String DataSourceCollections = File.ReadAllText(Path.Join(directory, "DataSourceCollections.json"));

        JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        options.Converters.Add(new JsonStringEnumConverter());

        _dataSourceCollectionList = System.Text.Json.JsonSerializer.Deserialize<List<DataSourceCollection>>(DataSourceCollections, options) ?? new List<DataSourceCollection>();
    }

    public void AddDataSourceCollection(DataSourceCollection DataSourceCollection)
    {
        _dataSourceCollectionList.Add(DataSourceCollection);
    }

    public void DeleteDataSourceCollection(Guid id)
    {
        _dataSourceCollectionList.RemoveAll(ds => ds.DataSourceCollectionUId == id);
    }

    public IEnumerable<DataSourceCollection> GetAllDataSourceCollections()
    {
        return _dataSourceCollectionList;
    }

    public DataSourceCollection? GetDataSourceCollectionById(Guid id)
    {
        return _dataSourceCollectionList.FirstOrDefault(ds => ds.DataSourceCollectionUId == id);
    }

    public void UpdateDataSourceCollection(DataSourceCollection DataSourceCollection)
    {
        throw new NotImplementedException();
    }
}
