namespace Matrix.KnowledgeLayer.Services.Controllers;

using Matrix.DataModels.Knowledge;
using Matrix.KnowledgeLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class KnowledgeController : ControllerBase
{
    private readonly IKnowledgeRepository _knowledgeRepository;

    public KnowledgeController(IKnowledgeRepository knowledgeRepository)
    {
        _knowledgeRepository = knowledgeRepository;
    }

    // GET: api/<AgentsController>
    [HttpGet]
    public IEnumerable<Knowledge> Get()
    {
        return _knowledgeRepository.GetAllKnowledge();
    }

    [HttpPost]
    public IActionResult AddAgent([FromBody] Knowledge knowledge)
    {
        if (knowledge == null)
        {
            return BadRequest();
        }

        _knowledgeRepository.AddKnowledge(knowledge);
        return CreatedAtAction(nameof(Get), new { name = knowledge.Name }, knowledge);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        Knowledge knowledge = _knowledgeRepository.GetKnowledgeById(id);
        return knowledge != null ? Ok(knowledge) : NotFound();
    }
}
