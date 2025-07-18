namespace ModelLayer.Services.Controllers;

using Matrix.ModelLayer.DataLayer;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ModelsController : ControllerBase
{
    private readonly IModelRepository _modelRepository;

    public ModelsController(IModelRepository modelRepository)
    {
        this._modelRepository = modelRepository;
    }

    // GET: api/<ModelsController>
    [HttpGet]
    public IEnumerable<Matrix.ModelLayer.DataModels.Model> Get()
    {
        return _modelRepository.GetAllModels();
    }

    //// GET api/<ModelsController>/5
    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    //// POST api/<ModelsController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<ModelsController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<ModelsController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
