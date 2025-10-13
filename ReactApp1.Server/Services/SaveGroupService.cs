using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

public class SaveGroupService(AppDbContext context) : ISaveGroupService
{
    public async Task<GroupDto> Save(GroupDto dto)
    {
        Group group;
        if (dto.Id.HasValue)
        {
            group = await context.Groups.FindAsync(dto.Id.Value)
                ?? throw new Exception("Group not found");
            group.SetValues(dto.Name, dto.Course, dto.Year);
            context.Groups.Update(group);
        }
        else
        {
            group = new Group(dto.Name, dto.Course, dto.Year);
            await context.Groups.AddAsync(group);
        }
        await context.SaveChangesAsync();
        return new GroupDto(group.Id, group.Name, group.Course, group.Year);
    }
}