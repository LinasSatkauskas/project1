using ReactApp1.Server.Models.DTOs;

public interface ISaveGroupService
{
    Task<GroupDto> Save(GroupDto dto);
}