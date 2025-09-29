using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Services;

public interface IGetStudentService
{
    Task<List<StudentDTO>> GetAll();
    Task<StudentDTO> Get(int id);
}


