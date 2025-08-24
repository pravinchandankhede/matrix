namespace Matrix.DataSourceLayer.DataLayer;

using Matrix.DataModels.Chunks;
using Matrix.DataModels.DataSources;
using Matrix.DataSourceLayer.Interfaces;
using System;

public class DataSourceManager
{
    private readonly IDataSourceRepository _dataSourceRepository;

    public DataSourceManager(IDataSourceRepository dataSourceRepository)
    {
        this._dataSourceRepository = dataSourceRepository;
    }

    public List<Document> Load(DataSource dataSource)
    {
        throw new NotImplementedException();
    }
}
