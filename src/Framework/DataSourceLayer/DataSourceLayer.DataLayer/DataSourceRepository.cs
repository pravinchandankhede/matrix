namespace Matrix.DataSourceLayer.DataLayer;

using Matrix.DataSourceLayer.DataModels;
using Matrix.DataSourceLayer.Interfaces;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DataSourceRepository : IDataSourceRepository
{
    public List<DataSource> _dataSourceList { get; set; } = [];

    public DataSourceRepository()
    {
        var directory = AppDomain.CurrentDomain.BaseDirectory;
        var dataSources = File.ReadAllText(Path.Join(directory, "datasources.json"));

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        options.Converters.Add(new JsonStringEnumConverter());

        _dataSourceList = System.Text.Json.JsonSerializer.Deserialize<List<DataSource>>(dataSources,options) ?? new List<DataSource>();
    }

    public void AddDataSource(DataSource dataSource)
    {
        _dataSourceList.Add(dataSource);
    }

    public void DeleteDataSource(Guid id)
    {
       _dataSourceList.RemoveAll(ds => ds.DataSourceId == id);
    }

    public IEnumerable<DataSource> GetAllDataSources()
    {
        return _dataSourceList;
    }

    public DataSource? GetDataSourceById(Guid id)
    {
        throw new NotImplementedException();
    }

    public void UpdateDataSource(DataSource dataSource)
    {
        throw new NotImplementedException();
    }
}
