using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{
    public class SaveSubjectService(AppDbContext context) : ISaveSubjectService
    {
        public async Task Store(SubjectDto dto)
        {
            var subject = new Subject(dto.Name, dto.Code, dto.Description);
            context.Subjects.Add(subject);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, SubjectDto dto)
        {
            var subject = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            if (subject is null) return;
            subject.SetValues(dto.Name, dto.Code, dto.Description);
            await context.SaveChangesAsync();
        }
    }
}