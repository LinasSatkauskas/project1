using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Services;

public class DeleteLecturerService(AppDbContext context) : IDeleteLecturerService
{
    public async Task Delete(int id)
    {
        var lecturer = await context.Lecturers.FirstOrDefaultAsync(s => s.Id == id);
        if (lecturer is null)
            throw new Exception($"Lecturer with id {id} not found.");

        context.Lecturers.Remove(lecturer);
        await context.SaveChangesAsync();
    }
}