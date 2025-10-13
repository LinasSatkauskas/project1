using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services;
public interface IGetSubjectService
{
    Task<List<SubjectDto>> GetAll();
    Task<SubjectDto?> Get(int id);
}