namespace Matrix.DataSourceLayer.Interfaces;

using Matrix.DataModels.DataSources;

public interface IDataSourceCollectionRepository
{
    /// <summary>
    /// Gets the data source by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the data source.</param>
    /// <returns>The data source if found; otherwise, null.</returns>
    DataSourceCollection? GetDataSourceCollectionById(Guid id);
    /// <summary>
    /// Gets all data sources.
    /// </summary>
    /// <returns>A DataSourceCollection of all data sources.</returns>
    IEnumerable<DataSourceCollection> GetAllDataSourceCollections();
    /// <summary>
    /// Adds a new data source.
    /// </summary>
    /// <param name="DataSourceCollection">The data source to add.</param>
    void AddDataSourceCollection(DataSourceCollection DataSourceCollection);
    /// <summary>
    /// Updates an existing data source.
    /// </summary>
    /// <param name="DataSourceCollection">The data source to update.</param>
    void UpdateDataSourceCollection(DataSourceCollection DataSourceCollection);
    /// <summary>
    /// Deletes a data source by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the data source to delete.</param>
    void DeleteDataSourceCollection(Guid id);
}
