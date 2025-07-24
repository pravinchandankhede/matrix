namespace ModelLayer.Services.Controllers;

using Matrix.ModelLayer.Interfaces;
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

    [HttpPost]
    public IActionResult AddModel([FromBody] Matrix.ModelLayer.DataModels.Model model)
    {
        if (model == null)
            return BadRequest();

        _modelRepository.AddModel(model);
        return CreatedAtAction(nameof(Get), new { name = model.Name }, model);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid modelId)
    {
        var model = _modelRepository.GetModel(modelId.ToString());
        return model != null ? Ok(model) : NotFound();
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
