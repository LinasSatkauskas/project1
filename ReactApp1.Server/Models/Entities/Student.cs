using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Entities
{
    public class Student(string firstName, string lastName, string email): Entity<int>
    {
        [MaxLength(20)] public string FirstName { get; private set; } = firstName;
        [MaxLength(20)] public string LastName { get; private set; } = lastName;
        [MaxLength(40)] public string Email { get; private set; } = email;

        public void setValues(string firstName, string lastName, string email)
        => (FirstName, LastName, Email) = (firstName, lastName, email);

    }
}
