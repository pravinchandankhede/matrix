namespace AgenticLayer.Services.Controllers;

using Matrix.AgenticLayer.DataLayer;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AgentsController : ControllerBase
{
    private readonly IAgentRepository _AgentRepository;

    public AgentsController(IAgentRepository AgentRepository)
    {
        _AgentRepository = AgentRepository;
    }

    // GET: api/<AgentsController>
    [HttpGet]
    public IEnumerable<Matrix.AgenticLayer.AgentModels.Agent> Get()
    {
        return _AgentRepository.GetAllAgents();
    }

    //// GET api/<AgentsController>/5
    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    //// POST api/<AgentsController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<AgentsController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<AgentsController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
