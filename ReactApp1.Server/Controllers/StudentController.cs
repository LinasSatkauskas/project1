using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route(template: "api/[controller]")]



public class StudentController(AppDbContext context) : ControllerBase
{
    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var students = await context.Students.ToListAsync();
        List<StudentDto> results = [];

        foreach (var student in students) {
            results.Add(new StudentDto(student.Id, student.FirstName, student.LastName, student.Email));
        }

        return Ok(results);

    }



[HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudentDto dto)
    {
        var student = await context.Students.FirstOrDefaultAsync(Student => Student.Id == id);
        if (student != null)

        {

            student.setValues(dto.FirstName, dto.LastName, dto.Email);
            context.Students.Update(student);
            await context.SaveChangesAsync();
        }
        return Ok();
    }
}