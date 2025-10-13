using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;

namespace ReactApp1.Server.Models.Entities

{
    public class Programme : Entity<int>
    {
        public string Name { get; private set; }
        public int? DurationYears { get; private set; }

        // EF Core many-to-many navigation
        public ICollection<Subject> Subjects { get; private set; } = new HashSet<Subject>();

        public Programme(string name, int? durationYears)
        {
            Name = name;
            DurationYears = durationYears;
        }

        public void SetValues(string name, int? durationYears)
        {
            Name = name;
            DurationYears = durationYears;
        }

        public void SetSubjects(IEnumerable<Subject> subjects)
        {
            Subjects.Clear();
            if (subjects == null) return;
            foreach (var s in subjects)
            {
                Subjects.Add(s);
            }
        }
    }
}