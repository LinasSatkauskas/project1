using ReactApp1.Server.Data;
using ReactApp1.Server.Models.Entities;

public class DeleteGroupService(AppDbContext context) : IDeleteGroupService
{
    public async Task Delete(int id)
    {
        var group = await context.Groups.FindAsync(id)
            ?? throw new Exception("Group not found");
        context.Groups.Remove(group);
        await context.SaveChangesAsync();
    }
}