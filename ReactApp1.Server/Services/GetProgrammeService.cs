using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{
    public class GetProgrammeService(AppDbContext context) : IGetProgrammeService
    {
        public async Task<List<ProgrammeDto>> GetAll()
        {
            var programmes = await context.Programmes
                .Include(p => p.Subjects)
                .ToListAsync();

            var results = programmes.Select(p =>
                new ProgrammeDto(p.Id, p.Name, p.DurationYears, p.Subjects.Select(s => s.Id)))
                .ToList();

            return results;
        }

        public async Task<ProgrammeDto?> GetById(int id)
        {
            var programme = await context.Programmes
                .Include(p => p.Subjects)
                .FirstOrDefaultAsync(p => p.Id == id);

            return programme == null
                ? null
                : new ProgrammeDto(programme.Id, programme.Name, programme.DurationYears, programme.Subjects.Select(s => s.Id));
        }
    }
}