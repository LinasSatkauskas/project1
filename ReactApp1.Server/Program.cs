using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Services;


namespace ReactWithASP.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load configuration from appsettings
            var config = builder.Configuration;
            var mysqlDb = config["MySQL:Db"];
            var mysqlUser = config["MySQL:User"];
            var mysqlPassword = config["MySQL:Password"];

            // Connection string without Unicode or CharSet
            var mysqlConn = $"server=localhost;port=3306;user={mysqlUser};password={mysqlPassword};database={mysqlDb};TreatTinyAsBoolean=false";

            // Configure Entity Framework Core with MySQL
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(mysqlConn, ServerVersion.AutoDetect(mysqlConn))
            );

            // Add framework services
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // --- Register custom application services ---

            // Students
            builder.Services.AddScoped<IGetStudentService, GetStudentService>();
            builder.Services.AddScoped<ISaveStudentService, SaveStudentService>();
            builder.Services.AddScoped<IDeleteStudentService, DeleteStudentService>();
            // Groups
            builder.Services.AddScoped<IGetGroupService, GetGroupService>();
            builder.Services.AddScoped<ISaveGroupService, SaveGroupService>();
            builder.Services.AddScoped<IDeleteGroupService, DeleteGroupService>();

            builder.Services.AddScoped<IGetLecturerService, GetLecturerService>();
            builder.Services.AddScoped<ISaveLecturerService, SaveLecturerService>();
            builder.Services.AddScoped<IDeleteLecturerService, DeleteLecturerService>();

            builder.Services.AddScoped<IGetProgrammeService, GetProgrammeService>();
            builder.Services.AddScoped<IManageProgrammeService, ManageProgrammeService>();

            // Subjects
            builder.Services.AddScoped<IGetSubjectService, GetSubjectService>();
            builder.Services.AddScoped<ISaveSubjectService, SaveSubjectService>();
            builder.Services.AddScoped<IDeleteSubjectService, DeleteSubjectService>();

            var app = builder.Build();

            // Middleware setup
            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Map controllers
            app.MapControllers();

            // Fallback for SPA
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}









