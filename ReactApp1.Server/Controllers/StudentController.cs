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
            results.Add(new StudentDto(student.id, FullName: $"{student.FirstName} {student.LastName}", student.Email));
        }

        return Ok(results);

    }

}