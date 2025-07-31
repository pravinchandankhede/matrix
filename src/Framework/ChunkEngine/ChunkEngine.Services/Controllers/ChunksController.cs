namespace ChunkEngine.Services.Controllers;

using Matrix.ChunkEngine.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ChunksController : ControllerBase
{
    private readonly IChunkRepository _chunkRepository;

    public ChunksController(IChunkRepository chunkRepository)
    {
        this._chunkRepository = chunkRepository;
    }

    // GET: api/<ModelsController>
    [HttpGet]
    public IEnumerable<Matrix.ChunkEngine.DataModels.Chunk> Get()
    {
        return _chunkRepository.GetAllChunks();
    }

    [HttpPost]
    public IActionResult AddModel([FromBody] Matrix.ChunkEngine.DataModels.Chunk chunk)
    {
        if (chunk == null)
        {
            return BadRequest();
        }

        _chunkRepository.AddChunk(chunk);
        return CreatedAtAction(nameof(Get), new { name = chunk.ChunkUId }, chunk);
    }

    //// GET api/<AgentsController>/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        Matrix.ChunkEngine.DataModels.Chunk? model = _chunkRepository.GetChunkById(id);
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
