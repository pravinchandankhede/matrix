namespace Matrix.DataSourceLayer.DataLayer;

using Matrix.DataModels.DataSources;
using Matrix.DataSourceLayer.Interfaces;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DataSourceRepository : IDataSourceRepository
{
    public List<DataSource> _dataSourceList { get; set; } = [];

    public DataSourceRepository()
    {
        String directory = AppDomain.CurrentDomain.BaseDirectory;
        String dataSources = File.ReadAllText(Path.Join(directory, "datasources.json"));

        JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Use original property names
        };
        options.Converters.Add(new JsonStringEnumConverter());

        _dataSourceList = System.Text.Json.JsonSerializer.Deserialize<List<DataSource>>(dataSources, options) ?? new List<DataSource>();
    }

    public void AddDataSource(DataSource dataSource)
    {
        _dataSourceList.Add(dataSource);
    }

    public void DeleteDataSource(Guid id)
    {
        _dataSourceList.RemoveAll(ds => ds.DataSourceUId == id);
    }

    public IEnumerable<DataSource> GetAllDataSources()
    {
        return _dataSourceList;
    }

    public DataSource? GetDataSourceById(Guid id)
    {
        return _dataSourceList.Find(ds => ds.DataSourceUId == id);
    }

    public void UpdateDataSource(DataSource dataSource)
    {
        throw new NotImplementedException();
    }
}
