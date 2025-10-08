using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Services;

public class DeleteStudentService(AppDbContext context) : IDeleteStudentService
{
    public async Task Delete(int id)
    {
        var student = await context.Students.FirstOrDefaultAsync(s => s.Id == id);
        if (student is null)
            throw new Exception($"Student with id {id} not found.");

        context.Students.Remove(student);
        await context.SaveChangesAsync();
    }
}