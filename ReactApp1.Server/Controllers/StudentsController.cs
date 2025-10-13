using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route(template: "api/[controller]")]



public class StudentsController(IGetStudentService getStudentService,
    ISaveStudentService saveStudentService,
    IDeleteStudentService deleteStudentService) : ControllerBase
{
    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var results = await getStudentService.GetAll();

        return Ok(results);

    }

    [HttpPost]
    public async Task<IActionResult> Post(StudentDto dto)
    {
        await saveStudentService.Store(dto);
        return Ok();
    }

    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudentDto dto)
    {
      await saveStudentService.Update(id, dto);
        return Ok();
    }

    [HttpDelete("{id:int}")]

    public async Task<IActionResult> Delete(int id)
    {
        await deleteStudentService.Delete(id);
        return Ok();
    }

}