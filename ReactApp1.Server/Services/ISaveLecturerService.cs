using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Services
{
    public interface ISaveLecturerService
    {
        Task Store(LecturerDto dto);
        Task Update(int id, LecturerDto dto);
    }
}
