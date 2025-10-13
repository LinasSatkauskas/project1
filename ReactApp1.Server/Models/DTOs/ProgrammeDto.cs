namespace ReactApp1.Server.Models.DTOs
{
    // SubjectIds holds the related subject ids for many-to-many
    public sealed record ProgrammeDto(int Id, string Name, int? DurationYears, IEnumerable<int>? SubjectIds);
}