namespace Matrix.DataSourceLayer.Interfaces;

using Matrix.DataSourceLayer.DataModels;

public interface IDataSourceRepository
{
    /// <summary>
    /// Gets the data source by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the data source.</param>
    /// <returns>The data source if found; otherwise, null.</returns>
    DataSource? GetDataSourceById(Guid id);
    /// <summary>
    /// Gets all data sources.
    /// </summary>
    /// <returns>A collection of all data sources.</returns>
    IEnumerable<DataSource> GetAllDataSources();
    /// <summary>
    /// Adds a new data source.
    /// </summary>
    /// <param name="dataSource">The data source to add.</param>
    void AddDataSource(DataSource dataSource);
    /// <summary>
    /// Updates an existing data source.
    /// </summary>
    /// <param name="dataSource">The data source to update.</param>
    void UpdateDataSource(DataSource dataSource);
    /// <summary>
    /// Deletes a data source by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the data source to delete.</param>
    void DeleteDataSource(Guid id);
}
