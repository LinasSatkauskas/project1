using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgrammesController : ControllerBase
    {
        private readonly IGetProgrammeService getProgrammeService;
        private readonly IManageProgrammeService manageProgrammeService;

        public ProgrammesController(IGetProgrammeService getProgrammeService, IManageProgrammeService manageProgrammeService)
        {
            this.getProgrammeService = getProgrammeService;
            this.manageProgrammeService = manageProgrammeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await getProgrammeService.GetAll();
            return Ok(results);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await getProgrammeService.GetById(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProgrammeDto dto)
        {
            var created = await manageProgrammeService.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProgrammeDto dto)
        {
            var ok = await manageProgrammeService.Update(id, dto);
            return ok ? NoContent() : NotFound();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await manageProgrammeService.Delete(id);
            return ok ? NoContent() : NotFound();
        }
    }
}