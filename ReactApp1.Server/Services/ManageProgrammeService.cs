using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{
    public class ManageProgrammeService(AppDbContext context) : IManageProgrammeService
    {
        public async Task<ProgrammeDto> Create(ProgrammeDto dto)
        {
            var entity = new Programme(dto.Name, dto.DurationYears);

            if (dto.SubjectIds != null)
            {
                var subjects = await context.Subjects.Where(s => dto.SubjectIds.Contains(s.Id)).ToListAsync();
                entity.SetSubjects(subjects);
            }

            await context.Programmes.AddAsync(entity);
            await context.SaveChangesAsync();

            return new ProgrammeDto(entity.Id, entity.Name, entity.DurationYears, entity.Subjects.Select(s => s.Id));
        }

        public async Task<bool> Update(int id, ProgrammeDto dto)
        {
            var entity = await context.Programmes
                .Include(p => p.Subjects)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (entity == null) return false;

            entity.SetValues(dto.Name, dto.DurationYears);

            if (dto.SubjectIds != null)
            {
                var subjects = await context.Subjects.Where(s => dto.SubjectIds.Contains(s.Id)).ToListAsync();
                entity.SetSubjects(subjects);
            }
            else
            {
                entity.SetSubjects(Enumerable.Empty<Subject>());
            }

            context.Programmes.Update(entity);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await context.Programmes.FirstOrDefaultAsync(p => p.Id == id);
            if (entity == null) return false;

            context.Programmes.Remove(entity);
            await context.SaveChangesAsync();
            return true;
        }
    }
}