using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models.Entities;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
namespace ReactApp1.Server.Services
{
    public class SaveLecturerService(AppDbContext context) : ISaveLecturerService
    {
        public async Task Store(LecturerDto dto)
        {
            var lecturer = new Lecturer(dto.FirstName, dto.LastName, dto.Email);
            context.Lecturers.Add(lecturer);
            await context.SaveChangesAsync();
        }
        public async Task Update(int id, LecturerDto dto)
        {
            var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
            if (lecturer != null)
            {
                lecturer.setValues(dto.FirstName, dto.LastName, dto.Email);
                context.Lecturers.Update(lecturer);
                await context.SaveChangesAsync();
            }
        }

    }
}
