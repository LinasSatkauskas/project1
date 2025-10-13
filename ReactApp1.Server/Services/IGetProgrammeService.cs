using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Services
{
    public interface IGetProgrammeService
    {
        Task<List<ProgrammeDto>> GetAll();
        Task<ProgrammeDto?> GetById(int id);
    }
}