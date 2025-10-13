using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.DTOs;
using ReactApp1.Server.Models.Entities;

namespace ReactApp1.Server.Services
{ 
    public class GetGroupService(AppDbContext context) : IGetGroupService
    {
        public async Task<List<GroupDto>> GetAll()
        {
            var groups = await context.Groups.ToListAsync();
            List<GroupDto> results = new();

            foreach (var group in groups)
            {
                results.Add(MapDto(group));
            }

            return results;
        }

        public async Task<GroupDto?> GetById(int id)
        {
            var group = await context.Groups.FirstOrDefaultAsync(g => g.Id == id);
            return group == null ? null : MapDto(group);
        }

        private static GroupDto MapDto(Group group)
            => new(group.Id, group.Name, group.Course, group.Year);
    }
}