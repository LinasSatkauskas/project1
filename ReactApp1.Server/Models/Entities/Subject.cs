using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Entities
{
    public class Subject(string name, string code, string description) : Entity<int>
    {
        [MaxLength(50)] public string Name { get; private set; } = name;
        [MaxLength(20)] public string Code { get; private set; } = code;
        [MaxLength(200)] public string Description { get; private set; } = description;

        // Many-to-many back navigation
        public ICollection<Programme> Programmes { get; private set; } = new HashSet<Programme>();

        public void SetValues(string name, string code, string description)
        {
            Name = name;
            Code = code;
            Description = description;
        }
    }
}
