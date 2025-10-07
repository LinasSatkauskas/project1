using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route(template: "api/[controller]")]



public class LecturersController(IGetLecturerService getLecturerService, ISaveLecturerService saveLecturerService) : ControllerBase
{
    [HttpGet]

    public async Task<IActionResult> GetAll()
    {
        var results = await getLecturerService.GetAll();

        return Ok(results);

    }

    [HttpPost]
    public async Task<IActionResult> Post(LecturerDto dto)
    {
        await saveLecturerService.Store(dto);
        return Ok();
    }

    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, LecturerDto dto)
    {
        await saveLecturerService.Update(id, dto);
        return Ok();
    }
}