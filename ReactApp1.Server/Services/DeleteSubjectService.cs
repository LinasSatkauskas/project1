using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;

namespace ReactApp1.Server.Services;

public class DeleteSubjectService(AppDbContext context) : IDeleteSubjectService
{
    public async Task Delete(int id)
    {
        var subject = await context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
        if (subject is null)
            throw new Exception($"Subject with id {id} not found.");

        context.Subjects.Remove(subject);
        await context.SaveChangesAsync();
    }
}