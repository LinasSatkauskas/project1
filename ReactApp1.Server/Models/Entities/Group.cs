namespace ReactApp1.Server.Models.Entities
{
    public class Group : Entity<int>
    {
        public string Name { get; private set; }
        public string? Course { get; private set; }
        public int? Year { get; private set; }

        public Group(string name, string? course, int? year)
        {
            Name = name;
            Course = course;
            Year = year;
        }

        public void SetValues(string name, string? course, int? year)
        {
            Name = name;
            Course = course;
            Year = year;
        }
    }
}
