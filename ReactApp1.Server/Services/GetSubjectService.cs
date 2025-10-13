using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{
    public class GetSubjectService(AppDbContext context) : IGetSubjectService
    {
        public async Task<List<SubjectDto>> GetAll()
        {
            var subjects = await context.Subjects.ToListAsync();
            var results = new List<SubjectDto>();

            foreach (var subject in subjects)
            {
                results.Add(MapDto(subject));
            }

            return results;
        }

        public async Task<SubjectDto?> Get(int id)
        {
            var subject = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            return subject == null ? null : MapDto(subject);
        }

        private SubjectDto MapDto(Subject subject)
            => new SubjectDto(subject.Id, subject.Name, subject.Code, subject.Description);
    }
}