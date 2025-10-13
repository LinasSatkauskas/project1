using ReactApp1.Server.Models.DTOs;

public interface IGetGroupService
{
    Task<List<GroupDto>> GetAll();
    Task<GroupDto?> GetById(int id);
}