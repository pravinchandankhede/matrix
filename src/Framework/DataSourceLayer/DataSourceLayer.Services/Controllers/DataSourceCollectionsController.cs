// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Matrix.DataSourceLayer.Services.Controllers;

using Matrix.DataSourceLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DataSourceCollectionsController : ControllerBase
{
    private readonly IDataSourceCollectionRepository _DataSourceCollectionRepository;

    public DataSourceCollectionsController(IDataSourceCollectionRepository DataSourceCollectionRepository)
    {
        _DataSourceCollectionRepository = DataSourceCollectionRepository;
    }

    // GET: api/<AgentsController>
    [HttpGet]
    public IEnumerable<Matrix.DataSourceLayer.DataModels.DataSourceCollection> Get()
    {
        return _DataSourceCollectionRepository.GetAllDataSourceCollections();
    }

    [HttpPost]
    public IActionResult AddAgent([FromBody] Matrix.DataSourceLayer.DataModels.DataSourceCollection DataSourceCollection)
    {
        if (DataSourceCollection == null)
        {
            return BadRequest();
        }

        _DataSourceCollectionRepository.AddDataSourceCollection(DataSourceCollection);
        return CreatedAtAction(nameof(Get), new { name = DataSourceCollection.Name }, DataSourceCollection);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        DataModels.DataSourceCollection dataSourceCollection = _DataSourceCollectionRepository.GetDataSourceCollectionById(id);
        return dataSourceCollection != null ? Ok(dataSourceCollection) : NotFound();
    }

    //// POST api/<DataSourceCollectionsController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<DataSourceCollectionsController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<DataSourceCollectionsController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
