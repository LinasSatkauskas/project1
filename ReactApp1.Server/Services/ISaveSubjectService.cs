using ReactApp1.Server.Models.DTOs;
public interface ISaveSubjectService
{
    Task Store(SubjectDto dto);
    Task Update(int id, SubjectDto dto);
}