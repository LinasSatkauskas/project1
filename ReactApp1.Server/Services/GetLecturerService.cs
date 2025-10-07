using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{
    public class GetLecturerService(AppDbContext context) : IGetLecturerService
    {
        public async Task<List<LecturerDto>> GetAll()

        {
            var lecturers = await context.Lecturers.ToListAsync();
            List<LecturerDto> results = [];

            foreach (var lecturer in lecturers)
            {
                results.Add(MapDto(lecturer));
            }

            return results;
        }

        public async Task<LecturerDto> Get(int id)
        {
            var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(lecturer);
        }
        private LecturerDto MapDto(Lecturer lecturer)
            => new LecturerDto(lecturer.Id, lecturer.FirstName, lecturer.LastName, lecturer.Email);
    }
}