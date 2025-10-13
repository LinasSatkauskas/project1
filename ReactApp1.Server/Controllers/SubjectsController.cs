using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route(template: "api/[controller]")]



public class SubjectsController(IGetSubjectService getSubjectService,
    ISaveSubjectService saveSubjectService,
    IDeleteSubjectService deleteSubjectService) : ControllerBase
{
    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var results = await getSubjectService.GetAll();

        return Ok(results);

    }

    [HttpPost]
    public async Task<IActionResult> Post(SubjectDto dto)
    {
        await saveSubjectService.Store(dto);
        return Ok();
    }

    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, SubjectDto dto)
    {
        await saveSubjectService.Update(id, dto);
        return Ok();
    }

    [HttpDelete("{id:int}")]

    public async Task<IActionResult> Delete(int id)
    {
        await deleteSubjectService.Delete(id);
        return Ok();
    }

}