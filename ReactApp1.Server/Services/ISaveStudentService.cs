using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Services
{
    public interface ISaveStudentService
    {
        Task Store(StudentDto dto);
        Task Update(int id, StudentDto dto);
    }
}
