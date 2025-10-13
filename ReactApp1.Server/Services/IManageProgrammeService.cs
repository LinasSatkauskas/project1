using ReactApp1.Server.Models.DTOs;

namespace ReactApp1.Server.Services
{
    public interface IManageProgrammeService
    {
        Task<ProgrammeDto> Create(ProgrammeDto dto);
        Task<bool> Update(int id, ProgrammeDto dto);
        Task<bool> Delete(int id);
    }
}