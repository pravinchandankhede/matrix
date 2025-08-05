namespace AgenticLayer.Services.Controllers;

using Matrix.DataModels.Agents;
using Matrix.DataRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AgentsController : ControllerBase
{
    private readonly IAgentRepository _agentRepository;

    public AgentsController(IAgentRepository agentRepository)
    {
        _agentRepository = agentRepository;
    }

    // GET: api/<AgentsController>
    [HttpGet]
    public IEnumerable<Agent> Get()
    {
        return _agentRepository.GetAll();
    }

    [HttpPost]
    public IActionResult AddAgent([FromBody] Agent agent)
    {
        if (agent == null)
            return BadRequest();

        _agentRepository.Add(agent);
        return CreatedAtAction(nameof(Get), new { name = agent.Name }, agent);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid agentId)
    {
        var agent = _agentRepository.GetById(agentId);
        return agent != null ? Ok(agent) : NotFound();        
    }

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
