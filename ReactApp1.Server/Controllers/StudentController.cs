using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route(template: "api/[controller]")]



public class StudentsController(IGetStudentService getStudentService, ISaveStudentService saveStudentService) : ControllerBase
{
    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var results = await getStudentService.GetAll();

        return Ok(results);

    }



[HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudentDto dto)
    {
      await saveStudentService.Update(id, dto);
        return Ok();
    }
}