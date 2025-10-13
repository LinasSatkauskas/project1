using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupsController(
    IGetGroupService getGroupService,
    ISaveGroupService saveGroupService,
    IDeleteGroupService deleteGroupService
) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getGroupService.GetAll();
        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> Post(GroupDto dto)
    {
        await saveGroupService.Save(dto);
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, GroupDto dto)
    {
        await saveGroupService.Save(dto);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await deleteGroupService.Delete(id);
        return Ok();
    }
}