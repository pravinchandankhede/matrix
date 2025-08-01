// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Matrix.DataSourceLayer.Services.Controllers;

using Matrix.DataSourceLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DataSourcesController : ControllerBase
{
    private readonly IDataSourceRepository _dataSourceRepository;

    public DataSourcesController(IDataSourceRepository dataSourceRepository)
    {
        _dataSourceRepository = dataSourceRepository;
    }

    // GET: api/<AgentsController>
    [HttpGet]
    public IEnumerable<Matrix.DataSourceLayer.DataModels.DataSource> Get()
    {
        return _dataSourceRepository.GetAllDataSources();
    }

    [HttpPost]
    public IActionResult AddAgent([FromBody] Matrix.DataSourceLayer.DataModels.DataSource dataSource)
    {
        if (dataSource == null)
        {
            return BadRequest();
        }

        _dataSourceRepository.AddDataSource(dataSource);
        return CreatedAtAction(nameof(Get), new { name = dataSource.Name }, dataSource);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        DataModels.DataSource dataSource = _dataSourceRepository.GetDataSourceById(id);
        return dataSource != null ? Ok(dataSource) : NotFound();
    }

    //// POST api/<DataSourcesController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<DataSourcesController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<DataSourcesController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
