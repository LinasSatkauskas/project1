using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services;

public interface IGetLecturerService
{
    Task<List<LecturerDto>> GetAll();
    Task<LecturerDto> Get(int id);
}


